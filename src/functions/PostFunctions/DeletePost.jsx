import { db, storage } from "../../firebase";
import { doc, deleteDoc } from 'firebase/firestore';
import getDataByType from "./getDataByType";
import { ref, deleteObject } from 'firebase/storage';

/**
 * @description post의 Id에 따라 firebase에서 삭제함. thumbnail도 삭제.
 * @param {string} postId - 삭제할 문서의 Id
 */
const deletePost = async (postId) => {
    try {
        const thumbnailUrl = await getDataByType(postId, 'thumbnailUrl');

        if (thumbnailUrl !== process.env.REACT_APP_DEFAULT_THUMBNAIL) {
            const url = new URL(thumbnailUrl);
            const path = decodeURIComponent(url.pathname);
            const storageRef = ref(storage, path);

            await deleteObject(storageRef);
        }

        const postRef = doc(db, 'posts', postId);
        await deleteDoc(postRef);
        alert('Post deleted')
    } catch (e) {
        console.error('Error deleting post: ', e);
    }
}

export default deletePost;