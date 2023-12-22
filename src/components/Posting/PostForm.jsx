// PostForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import writePost from '../PostFunctions/WritePosts';
import { uploadImage } from '../PostFunctions/UploadImage'; // 경로 수정 필요
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  // const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const onDrop = async (acceptedFiles) => {
    try {
      // Upload the image and get the download URL
      const imageUrl = await uploadImage(acceptedFiles[0]);

      // Append the image URL to the content
      setContent((prevContent) => `${prevContent}\n\n![Alt Text](${imageUrl})`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    writePost(title, content);
    setTitle('');
    setContent('');
    setPreviewMode(false);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        제목:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        내용:
        {/* textarea 수정 */}
        <textarea value={content} onChange={handleContentChange} />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {/* 설명 삭제 */}
        </div>
      </label>
      <br />
      <button type="submit">글 작성</button>
      <button type="button" onClick={togglePreview}>
        {previewMode ? '작성 모드' : '미리보기'}
      </button>
      <div>
        <strong>미리보기:</strong>
        <div>
          <ReactMarkdown plugins={[gfm]} children={content} />
        </div>
      </div>
    </form>
  );
}

export default PostForm;
