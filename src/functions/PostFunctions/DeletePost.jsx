import { db, storage } from "../../firebase";
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import checkPath from "../TestFunctions/metadata";

/**
 * @description post의 Id에 따라 firebase에서 삭제함. thumbnail도 삭제.
 * @param {string} postId 삭제할 문서의 Id
 * @param {string} userAddress 삭제할 유저의 address값
 */
const deletePost = async (postId, userAddress, contentNum) => {
    try {
        await checkPath(userAddress, contentNum);
        const storageRef = ref(storage, `${userAddress}/${contentNum}`);
        await deleteObject(storageRef);

        const postRef = doc(db, 'posts', postId);
        await deleteDoc(postRef);
        console.log('post deleted: ', postId);
    } catch (e) {
        console.error('Error deleting post: ', e);
        window.alert('Error deleting post!');
    }
}

export default deletePost;