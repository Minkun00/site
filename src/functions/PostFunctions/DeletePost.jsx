import { db } from "../../firebase";
import { doc, deleteDoc } from 'firebase/firestore';

/**
 * @description post의 Id에 따라 firebase에서 삭제함
 * @param {string} postId - 삭제할 문서의 Id
 */
const deletePost = async (postId) => {
    try {
        const postRef = doc(db, 'posts', postId);
        await deleteDoc(postRef);
        alert('Post deleted')
    } catch (e) {
        console.error('Error deleting post: ', e);
    }
}

export default deletePost;