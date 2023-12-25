import React, { useEffect, useState } from 'react';
import writePost from '../../functions/PostFunctions/WritePosts';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './PostForm.css';
import Caver from 'caver-js';
import LoginJson from '../../contract/login.json';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [isCertified, setIsCertified] = useState(false);

  const loginABI = LoginJson.abi;
  const loginAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const caver = new Caver(window.klaytn); 
  const contract = new caver.klay.Contract(loginABI, loginAddress);


  useEffect(() => {
    const checkCertification = async () => {
      try {
        const certified = await contract.methods.isCertified().call();
        setIsCertified(certified);
      } catch (error) {
        alert('You are not certified.');
        setIsCertified(false);
      }
    }
    checkCertification();
    console.log(`isCertified : ${isCertified}`);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() !== '' && content.trim() !== '') {
      writePost(title, content);
      setTitle('');
      setContent('');
      setPreviewMode(false);
    } else {
      alert('Empty post is not allowed!');
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleTest = async () => {
    const isCertifiedResult = await contract.methods.isCertified().call();
    console.log(isCertifiedResult);
  }

  return (
    <div>
      {isCertified ? (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input type="text" value={title} onChange={handleTitleChange} placeholder='title'/>
          </label>
        </div>
        <div>
          <label>
            {previewMode ? (
              <div>
                <ReactMarkdown className='preview-container' remarkPlugins={[gfm]} children={content} />
              </div>
            ) : (
              <textarea value={content} onChange={handleContentChange} placeholder='content'/>
            )}
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
          <p>You are not certified</p>
          <button onClick={handleTest}>test</button>
        </div>
      )}
    </div>
  );
}

export default PostForm;
