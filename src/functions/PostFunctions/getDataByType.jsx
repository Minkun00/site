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
            const returnData = postDocSnap.data()[typeFieldName];
            return returnData;
        } else {
            if (typeFieldName === 'thumbnailUrl') {
                // default no-image..
                return process.env.REACT_APP_DEFAULT_THUMBNAIL;
            } else {
                console.log('Post does not exist');
                return null;
            }
        }
    } catch (e) {
        console.error('Error getting thumbnail URL: ', e);
        return null;
    }
};

export default getDataByType;
