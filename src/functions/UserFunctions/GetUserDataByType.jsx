import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * 
 * @param {string} userAddress
 * @param {string} typeFieldName 
 * @returns {any} `users`에 해당하는 종류에 따른 data
 */
const getUserDataByType = async (userAddress, typeFieldName) => {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('userAddress', '==', userAddress));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`${userAddress} does not exist`);
            return null;
        }

        const userData = querySnapshot.docs[0].data();
        const typeFieldValue = userData[typeFieldName];

        console.log(`${typeFieldName} for ${userAddress}: ${typeFieldValue}`);
        return typeFieldValue;
    } catch (e) {
        console.error(`Error getting ${typeFieldName} : ${e}`);
        return null;
    }
};

export default getUserDataByType;
