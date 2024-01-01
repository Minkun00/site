import { db } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';
/**
 * @description user를 firebase에 저장하여 관리
 * @param {string} userAddress 입력할 user의 address
 * @param {boolean} isCertified 
 */
const writeUser = async(userAddress, isCertified) => {
    try {
        const usersCollections = collection(db, 'users');
        const newUserRef = await addDoc(usersCollections, {
            userAddress: userAddress,
            isCertified: isCertified,
            writtenPosts: 0,
            timestamp: new Date()
        });
        alert(`Written to Firebase : ${userAddress}`);
    } catch (e) {
        console.log('writeUser error occured : ', e);
    }
};

export default writeUser;