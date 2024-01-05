import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getPostById from '../../functions/PostFunctions/GetPostsById';
import './FullPosts.css';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { useSiteContext } from '../context';
import deletePost from '../../functions/PostFunctions/DeletePost';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

/**
 * @description id에 따라 post를 보여줌
 * @returns {React.ReactNode} post된 제목, content 내용 보여줌
 */
export default function FullPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { globalState } = useSiteContext();
  const [isWritter, setIsWritter] = useState(false);
  const [contentPath, setContentPath] = useState(null);
  const [markdownContent, setMarkdownContent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _post = await getPostById(postId);
        setPost(_post);
        setIsWritter(_post.userAddress === globalState);
        setContentPath(`${_post.userAddress}/${_post.contentNum}/${_post.title}.md`);
      } catch (e) {
        console.error('Error fetching post: ', e);
      }
    };

    fetchData();

    // Firebase Storage에서 마크다운 파일을 가져와서 React 컴포넌트에 표시
    const fetchMarkdownContent = async () => {
      try {
        console.log(contentPath);
        const storageRef = ref(storage, contentPath);
        const downloadURL = await getDownloadURL(storageRef);
        const response = await fetch(downloadURL);
        const content = await response.text();
        setMarkdownContent(content);
      } catch (e) {
        console.error('Error fetching markdown content: ', e);
      }
    };

    if (contentPath) {
      fetchMarkdownContent();
    }

  }, [postId, globalState, contentPath]);

  if (!post || !markdownContent) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    const confirmation = window.confirm('Do you really want to delete this post?');

    if (confirmation) {
      await deletePost(post, globalState);
      navigate('/site');
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
        <div>
          <p>{post.timestamp}</p>
          <ReactMarkdown remarkPlugins={[gfm]} children={markdownContent} />
        </div>
      </div>
    </div>
  );
}
