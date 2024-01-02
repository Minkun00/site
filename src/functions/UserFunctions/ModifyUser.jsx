import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
/**
 * @description user를 firebase에 저장하여 관리
 * @param {string} userAddress 입력할 user의 address
 * @param {boolean} isCertified 
 */
const writeUser = async (userAddress) => {
    try {
        const usersCollections = collection(db, 'users');
        await addDoc(usersCollections, {
            userAddress: userAddress,
            writtenPosts: 0,
            timestamp: new Date()
        });
        alert(`Written to Firebase : ${userAddress}`);
    } catch (e) {
        console.log('writeUser error occured : ', e);
    }
};

/**
 * @description user를 firebase에서 삭제
 * @param {string} userAddress 삭제할 user의 address
 * @param {boolean} isCertified 
 */
const deleteUser = async (userAddress) => {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('userAddress', '==', userAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            alert('User deleted: ', userAddress);
        });
    } catch (e) {
        console.error('deleteUser error occurred: ', e);
    }
};


export { writeUser, deleteUser };