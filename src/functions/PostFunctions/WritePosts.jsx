import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
/**
 * @param {string} title 
 * @param {string} content
 * @param {string} userAddress
 * @returns document writing to firebase database 
 */
const writePost = async(title, content, userAddress, thumbnailUrl) => {
    try {
        const postsCollection = collection(db, 'posts');
        const newPostRef = await addDoc(postsCollection, {
            title: title,
            content: content,
            userAddress: userAddress,
            timestamp: new Date(),
            thumbnailUrl: thumbnailUrl
        });
        console.log('written to firebase, ID : ', newPostRef.id);
        alert('Post is uploaded!')
        return newPostRef.id;
    } catch (e) {
        console.log('writting error occured : ', e);
    }
};

export default writePost;