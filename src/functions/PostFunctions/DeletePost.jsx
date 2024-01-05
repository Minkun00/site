import { db, storage } from "../../firebase";
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { modifyWrittenPosts } from "../UserFunctions/ModifyUser";

/**
 * @description post의 Id에 따라 firebase에서 삭제함. thumbnail도 삭제.
 * @param {Object} post id에 따른 post data object
 * @param {string} userAddress 삭제할 유저의 address값
 */
const deletePost = async (post, userAddress, contentNum) => {
    try {
        const { id : postId, contentImages, thumbnailFileName } = post;

        await Promise.all(contentImages.map(async (path) => {
            const imageRef = ref(storage, path);
            await deleteObject(imageRef);
        }));

        const thumbnailRef = ref(storage, `${userAddress}/${contentNum}/thumbnail/${thumbnailFileName}`);
        await deleteObject(thumbnailRef);

        const postDocRef = doc(db, 'posts', postId);
        await deleteDoc(postDocRef);
        await modifyWrittenPosts(userAddress, -1);

        alert('Post deleted successfully!');
    } catch (e) {
        console.log(`Error deleting post : ${e}`);
    }
}

export default deletePost;