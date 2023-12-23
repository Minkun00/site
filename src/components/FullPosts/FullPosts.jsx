// FullPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getPostById from '../../functions/PostFunctions/GetPostsById';
import './FullPosts.css'; // Import the updated CSS file

export default function FullPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await getPostById(postId);
        setPost(post);
      } catch (e) {
        console.error('Error fetching post: ', e);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
