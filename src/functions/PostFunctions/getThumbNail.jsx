import { db } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore';

const getThumbNailUrl = async (postId) => {
    try {
        const postRef = doc(db, 'posts', postId);
        const postDoc = await getDoc(postRef, {
            fieldMask: ['thumbnailUrl']
        });

        if (postDoc.exists()) {
            return {
                id: postDoc.id,
                ...postDoc.data(),
            };
        } else {
            throw new Error('Post not found');
        }
    } catch (error) {
        console.error('Error fetching post by ID: ', error);
        throw error;
    }
};

export default getThumbNailUrl;
