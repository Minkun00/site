import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import './PostForm.css';
import { useSiteContext } from '../context';
import getUserDataByType from '../../functions/UserFunctions/GetUserDataByType';

const ContentEditor = ({ onContentChange, initialContent, onContentImageNumChange, contentImageNum }) => {
  const [content, setContent] = useState(initialContent || '');
  const { globalState } = useSiteContext();

  const handleContentChange = (e) => {
    const newContent = e.target?.value || '';
    setContent(newContent);
    onContentChange(newContent);    
  };

  const handleImageUpload = async (e) => {
    const contentNum = await getUserDataByType(globalState, 'writtenPosts');
  
    const file = e.target.files[0];
    const updatedContentImageNum = `${globalState}/${contentNum}/${contentImageNum.length + 1}.${file.name.split('.').pop()}`;
    onContentImageNumChange((prevList) => [...prevList, updatedContentImageNum]);
  
    const storageRef = ref(storage, updatedContentImageNum);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
  
    const newContent = content + `![${contentImageNum.length + 1}](${imageUrl})`;
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div>
      <textarea className='content-editor' value={content} onChange={handleContentChange} placeholder='content' />
      <label htmlFor="thumbnailInput" className="image-upload-label">
        Content Image
        <div>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
        </div>
      </label>
    </div>
  );
};

export default ContentEditor;
