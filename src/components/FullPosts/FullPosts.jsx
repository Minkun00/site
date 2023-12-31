import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getPostById from '../../functions/PostFunctions/GetPostsById';
import './FullPosts.css';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { useSiteContext } from '../context';
import deletePost from '../../functions/PostFunctions/DeletePost';

/**
 * @description id에 따라 post를 보여줌
 * @returns {React.ReactNode} post된 제목, content 내용 보여줌
 */
export default function FullPost() {
  const { postId } = useParams();
  const [ post, setPost ] = useState(null);
  const { globalState } = useSiteContext();
  const [ isWritter, setIsWritter ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await getPostById(postId);
        setPost(post);
        setIsWritter(post.userAddress === globalState);
      } catch (e) {
        console.error('Error fetching post: ', e);
      }
    };

    fetchData();
    
  }, [postId, globalState]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    const confirmation = window.confirm('Do you really want to delete this post?');

    if (confirmation) {
      await deletePost(postId);
      navigate('/');
    }
  };

  const handleModify = async () => {
    alert('Not ready..')
  }

  return (
    <div>
      <div className='container'>
      {isWritter && (
        <div className='post-delete'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleModify}>Modify</button>
        </div>
      )}
        <ReactMarkdown className='title' remarkPlugins={[gfm]} children={post.title}/>
        <ReactMarkdown className='p' remarkPlugins={[gfm]} children={post.content}/>
      </div>
    </div>
  );
}
