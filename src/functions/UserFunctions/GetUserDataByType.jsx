import { db} from "../../firebase";
import { doc, getDoc } from 'firebase/firestore';
/**
 * 
 * @param {string} userId 
 * @param {string} typeFieldName 
 * @returns `users`에 해당하는 종류에 따른 data
 */
const getUserDataByType = async (userId, typeFieldName) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const returnData = userDoc.data()[typeFieldName];
            return returnData;
        }    

        console.log('User does not exist');
        return null;    
    } catch (e) {
        console.error(`Error getting ${typeFieldName} : ${e}`);
        return null;
    }
};

export default getUserDataByType;