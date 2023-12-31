import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WrittenPosts.css';
import getDataByType from '../../functions/PostFunctions/getDataByType';
import getAllPostIds from '../../functions/PostFunctions/GetAllPostsId';

/**
 * @description Main Page
 * @returns {React.ReactNode}
 */
export default function WrittenPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const postIds = await getAllPostIds();
       const postsData = await Promise.all(
        postIds.map(async (postId) => {
          const thumbnailUrl = await getDataByType(postId, 'thumbnailUrl');
          const title = await getDataByType(postId, 'title');

          return {
            id: postId,
            thumbnailUrl: thumbnailUrl,
            title: title,
          };
        })
       );

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
              <img
                src={post.thumbnailUrl}
                alt={`Thumbnail for ${post.title}`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}