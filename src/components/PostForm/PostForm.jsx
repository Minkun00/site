// PostForm.jsx
import React, { useState } from 'react';
import writePost from '../PostFunctions/WritePosts';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 모두 작성해주세요.');
      return;
    }

    writePost(title, content);
    setTitle('');
    setContent('');
    setPreviewMode(false);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          <h2>제목</h2>
          <input className='titlearea' type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <button type="submit">글 작성</button>
        <button type="button" onClick={togglePreview}>
          {previewMode ? '작성 모드' : '미리보기'}
        </button>
        <label className="form-label">
          <h3>내용</h3>
          {previewMode ? (
            <div className="preview-container">
              <ReactMarkdown plugins={[gfm]} children={content} />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={handleContentChange}
              className="textarea-preview"
            />
          )}
        </label>
        <br />
      </form>
    </div>
  );
}

export default PostForm;
