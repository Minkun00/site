import { ref, getMetadata } from 'firebase/storage';
import { storage } from '../../firebase';

const checkPath = async (userAddress, contentNum) => {
  const storageRef = ref(storage, `${userAddress}/`);

  try {
    const metadata = await getMetadata(storageRef);
    console.log('Metadata:', metadata);
  } catch (error) {
    console.error('Error getting metadata:', error);
  }
};

export default checkPath;