import { db } from "../../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

/**
 * @description 주어진 userAddress의 writtenPosts 값 + 1
 * @param {string} userAddress 증가시킬 user의 address
 * @param {Number} num -1 or +1
 */
const modifyWrittenPosts = async (userAddress, num) => {
    try {
        const usersCollection = collection(db, 'users');
        
        const q = query(usersCollection, where('userAddress', '==', userAddress));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDocRef = doc(usersCollection, querySnapshot.docs[0].id);
            
            const userDocSnapshot = await getDocs(userDocRef);
            const currentWrittenPosts = userDocSnapshot.data().writtenPosts;
            
            await updateDoc(userDocRef, {
                writtenPosts: currentWrittenPosts + num
            });
            
        } else {
            console.log(`No user found with address: ${userAddress}`);
        }
    } catch (e) {
        console.log('incrementWrittenPosts error: ', e);
    }
};

export default modifyWrittenPosts;