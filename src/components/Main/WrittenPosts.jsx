import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getPosts from '../../functions/PostFunctions/GetPosts';
import './WrittenPosts.css';
/**
 * @description Main Page
 * @returns {React.ReactNode}
 */
export default function WrittenPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (e) {
        console.error('Error fetching posts: ', e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='posts-main'>Posts</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`} className='link-style'>
              <div className="post-title">
                <strong>{post.title}</strong>
              </div>
            </Link>
              <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}