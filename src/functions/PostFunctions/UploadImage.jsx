import { storage } from "../../firebase";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const uploadImage = async (file) => {
    const storageRef = ref(storage, 'images/' + file.name);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export {uploadImage}