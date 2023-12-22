import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

/**
 * @param {string} title 
 * @param {string} content
 * @returns document writing to firebase database 
 */
const writePost = async(title, content) => {
    try {
        const postsCollection = collection(db, 'posts');
        const newPostRef = await addDoc(postsCollection, {
            title: title,
            content: content,
            timestamp: new Date(),
        });
        console.log('written to firebase, ID : ', newPostRef.id);
    } catch (e) {
        console.log('writting error occured : ', e);
    }
};

export default writePost;