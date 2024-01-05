import React, { useEffect, useState } from 'react';
import writePost from '../../functions/PostFunctions/WritePosts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import Caver from 'caver-js';
import LoginJson from '../../contract/login.json';
import ContentEditor from './ContentEditor';
import { useSiteContext } from '../context';
import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '../../firebase';
import getUserDataByType from '../../functions/UserFunctions/GetUserDataByType';
import { useNavigate } from 'react-router-dom';
import { modifyWrittenPosts } from '../../functions/UserFunctions/ModifyUser';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const { globalState } = useSiteContext();   // userAddress
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailFileName, setThumbnailFileName] = useState('');
  const [contentNum, setContentNum] = useState();
  const [contentImageList, setContentImageList] = useState([]);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() !== '' && content.trim() !== '' && thumbnailUrl !== '') {
      writePost(title,  
        globalState, 
        thumbnailUrl, 
        thumbnailFileName, 
        contentNum, 
        contentImageList);
      
      await modifyWrittenPosts(globalState, 1);
      await uploadMarkdownFile(content, title);
      navigate('/site');
    } else {
      alert('title, content, thumbnail are missing');
    }
  };

  const togglePreview = async () => {
    setPreviewMode(!previewMode);
  };

  const handleThumbnailUpload= async (e) => {
    const _contentNum = await getUserDataByType(globalState, 'writtenPosts');
    setContentNum(_contentNum);

    const file = e.target.files[0];
    const storageRef = ref(storage, `${globalState}/${_contentNum}/thumbnail/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    setThumbnailUrl(imageUrl);
    setThumbnailFileName(file.name);
  }

  async function uploadMarkdownFile(markdownContent, title) {
    const storageRef = ref(storage, `${globalState}/${contentNum}/${title}.md`);
    await uploadString(storageRef, markdownContent, 'raw');
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
                <ReactMarkdown
                  className='preview-container'
                  remarkPlugins={[gfm]}
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          children={String(children).replace(/<br>/g, '\n')}
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                  children={content}
                />
              </div>
            ) : (
              <ContentEditor 
                onContentChange={handleContentChange} 
                initialContent={content} 
                contentImageNum={contentImageList}
                onContentImageNumChange={setContentImageList}/>
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
