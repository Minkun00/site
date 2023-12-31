import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
/**
 * @description 작성한 post 저장
 * @param {string} title 
 * @param {string} content
 * @param {string} userAddress
 * @param {Url} thumbnailUrl
 * @param {string} thumbnailFileName
 * @param {Number} contentNum
 * @param {list} contentImages
 */
const writePost = async(title, content, userAddress, thumbnailUrl, thumbnailFileName, contentNum, contentImages) => {
    try {
        const postsCollection = collection(db, 'posts');
        const newPostRef = await addDoc(postsCollection, {
            title: title,
            content: content,
            userAddress: userAddress,
            timestamp: new Date(),
            thumbnailUrl: thumbnailUrl,
            thumbnailFileName: thumbnailFileName,
            contentNum: contentNum,
            contentImages: contentImages
        });
        console.log('written to firebase, ID : ', newPostRef.id);
        alert('Post is uploaded!')
        return newPostRef.id;
    } catch (e) {
        console.log('writting error occured : ', e);
    }
};

export default writePost;