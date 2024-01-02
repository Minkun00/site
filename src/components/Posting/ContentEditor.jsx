import React, {useState} from 'react';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../../firebase';
import './PostForm.css';
import { useSiteContext } from '../context'; 
import getUserDataByType from '../../functions/UserFunctions/GetUserDataByType';

const ContentEditor = ({onContentChange, initialContent }) => {
    const [content, setContent] = useState(initialContent ||'');
    const { globalState } = useSiteContext();

    const handleContentChange = (e) => {
        const newContent = e.target?.value || '';
        setContent(newContent);
        onContentChange(newContent);
    };

    // firestorage - userAddress/file_name에 저장
    const handleImageUpload = async(e) => {
        const contentNum = await getUserDataByType(globalState, 'writtenPosts');
        
        const file = e.target.files[0];
        const storageRef = ref(storage, `${globalState}/${contentNum}/` + file.name);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        setContent((prevContent) => prevContent + `![${file.name}](${imageUrl})`);
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