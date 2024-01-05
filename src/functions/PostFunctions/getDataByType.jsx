import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * @param {string} postId 
 * @param {string} type in Firebase document
 * @returns {post.data}`posts`에 해당하는 종류에 따른 data
 */
const getDataByType = async (postId, typeFieldName) => {
    try {
        const postDocRef = doc(db, 'posts', postId);
        const postDocSnap = await getDoc(postDocRef);

        const returnData = postDocSnap.data()[typeFieldName];
        return returnData;
    } catch (e) {
        console.error(`Error getting ${typeFieldName}: ${e}`);
        return null;
    }
};

export default getDataByType;
