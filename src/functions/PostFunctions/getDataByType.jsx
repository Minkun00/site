import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * @param {string} postId 
 * @param {string} type in Firebase document
 * @returns {string} thumbnailUrl
 */
const getDataByType = async (postId, typeFieldName) => {
    try {
        const postDocRef = doc(db, 'posts', postId);
        const postDocSnap = await getDoc(postDocRef);

        if (postDocSnap.exists()) {
            const thumbnailUrl = postDocSnap.data()[typeFieldName];
            return thumbnailUrl;
        } else {
            console.log('Post does not exist');
            return null;
        }
    } catch (e) {
        console.error('Error getting thumbnail URL: ', e);
        return null;
    }
};

export default getDataByType;
