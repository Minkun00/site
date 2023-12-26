import React, {useState} from 'react';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../../firebase';
import './PostForm.css';

const ContentEditor = ({onContentChange, initialContent, title }) => {
    const [content, setContent] = useState(initialContent ||'');

    const handleContentChange = (e) => {
        const newContent = e.target?.value || '';
        setContent(newContent);
        onContentChange(newContent);
    };

    // image는 title이 정해져야 삽입가능하게 설정
    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `${title}/` + file.name);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        setContent((prevContent) => prevContent + `![${file.name}](${imageUrl})`);
    };

    return (
        <div>
            <textarea className='content-editor' value={content} onChange={handleContentChange} placeholder='content' />
            <input type='file' accept='image/*' onChange={handleImageUpload} className='image-input-box'/>
        </div>
    );
};

export default ContentEditor;