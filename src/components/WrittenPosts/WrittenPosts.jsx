// WrittenPosts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getPosts from '../PostFunctions/GetPosts';
import './WrittenPosts.css';
/**
 * @description this is for Main Page.
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
      <h1>Posts</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`}>
              <div className="post-title">
                <strong>{post.title}</strong>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
