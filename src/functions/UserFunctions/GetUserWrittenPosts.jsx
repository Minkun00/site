import { db } from "../../firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
/**
 * @description userAddress에 따라 `writtenPosts`의 값이 얼마인지 return
 * @param {string} userAddress 
 * @returns {Number} userAddress.writtenPosts
 */
const getUserWrittenPosts = async(userAddress) => {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('userAddress', '==', userAddress));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            const writtenPosts = userDoc.writtenPosts;
            return writtenPosts;
        }
    } catch (e) {
        console.log('getUserWrittenPosts error : ', e);
        return null;
    }
};

export default getUserWrittenPosts;