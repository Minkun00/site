import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

/**
 * @returns {Array} Array of post IDs
 */
const getAllPostIds = async () => {
    try {
        const postsCollection = collection(db, 'posts');
        const querySnapShot = await getDocs(postsCollection);

        const postIds = [];
        querySnapShot.forEach((doc) => {
            postIds.push(doc.id);
        });
        return postIds;
    } catch (e) {
        alert(e);
        console.error('Error in getAllPostIds : ', e);
        return [];
    }
};

export default getAllPostIds;