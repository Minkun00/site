import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

/**
 * @description `posts`들의 모든 id들을 가져옴
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
        console.error('Error in getAllPostIds : ', e);
        return [];
    }
};

export default getAllPostIds;