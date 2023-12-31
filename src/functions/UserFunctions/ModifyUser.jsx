import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
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

/**
 * @description 주어진 userAddress의 writtenPosts 값 + 1 또는 -1
 * @param {string} userAddress 증가시킬 user의 address
 * @param {Number} num -1 or +1
 */
const modifyWrittenPosts = async (userAddress, num) => {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('userAddress', '==', userAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (_doc) => {
            const userDocRef = doc(usersCollection, _doc.id);
            const currentWrittenPosts = _doc.data().writtenPosts;
            
            await updateDoc(userDocRef, {
                writtenPosts: currentWrittenPosts + num
            });

            console.log(`Successfully incremented writtenPosts for user ${userAddress} by ${num}`);
        });
    } catch (e) {
        console.error('incrementUserWrittenPosts error: ', e);
    }
};

export { writeUser, deleteUser, modifyWrittenPosts };