import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getPostById from '../../functions/PostFunctions/GetPostsById';
import './FullPosts.css';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

/**
 * @description id에 따라 post를 보여줌
 * @returns {React.ReactNode} post된 제목, content 내용 보여줌
 */
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
    <div className='container'>
      <ReactMarkdown className='title' remarkPlugins={[gfm]} children={post.title}/>
      <ReactMarkdown className='p' remarkPlugins={[gfm]} children={post.content}/>
    </div>
  );
}
