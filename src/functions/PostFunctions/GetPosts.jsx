import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
/**
 * @description firebase의 모든 post 호출
 * @returns {object} 모든 post를 되돌려줌. { id, title, content }
 */
const getPosts = async () => {
  try {
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollection);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return posts;
  } catch (error) {
    console.error('error occured catching docs: ', error);
    throw error;
  }
};

export default getPosts;