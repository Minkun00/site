import React, { useEffect, useState } from 'react';
import writePost from '../../functions/PostFunctions/WritePosts';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './PostForm.css';
import Caver from 'caver-js';
import LoginJson from '../../contract/login.json';
import ContentEditor from './ContentEditor';
import { useSiteContext } from '../context';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const { globalState } = useSiteContext();   // userAddress
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  

  useEffect(() => {
    const checkCertification = async () => {
      try {
        const loginABI = LoginJson.abi;
        const loginAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const caver = new Caver(window.klaytn); 
        const contract = new caver.klay.Contract(loginABI, loginAddress);
        const certified = await contract.methods.isCertified().call({from: window.klaytn.selectedAddress});
        setIsCertified(certified);
      } catch (error) {
        setIsCertified(false);
      }
    }
    checkCertification();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() !== '' && content.trim() !== '' && thumbnailUrl !== '') {
      writePost(title, content, globalState, thumbnailUrl);

      setTitle('');
      setContent('');
      setPreviewMode(false);

    } else {
      alert('title, content, thumbnail are missing');
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleThumbnailUpload= async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `${globalState}/` + file.name);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    setThumbnailUrl(imageUrl);
  }

  return (
    <div className='post-form'>
      {isCertified ? (
      <form onSubmit={handleSubmit}>
        <div>
          <label className='label-container'>
            <input type="text" value={title} onChange={handleTitleChange} placeholder='title' className='title'/>
          </label>
        </div>
        
          <label>
            {previewMode ? (
              <div>
                <ReactMarkdown className='preview-container' remarkPlugins={[gfm]} children={content} />
              </div>
            ) : (
              <ContentEditor onContentChange={handleContentChange} initialContent={content} title={title}/>
            )}
          </label>

          <div>
          <label htmlFor="thumbnailInput" className="image-upload-label">
            Thumbnail image
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                id="thumbnailInput"
              />
            </div>
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={togglePreview}>
            {previewMode ? 'Write' : 'Preview'}
          </button>
        </div>
      </form>
      ) : (
        <div>
          <p className='warn'>You are not certified</p>
        </div>
      )}
    </div>
  );
}

export default PostForm;
