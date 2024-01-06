import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getPostById from '../../functions/PostFunctions/GetPostsById';
import styles from './FullPosts.module.css'; // Import the CSS module
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import deletePost from '../../functions/PostFunctions/DeletePost';
import { useSiteContext } from '../context';

export default function FullPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { globalState } = useSiteContext();
  const [isWritter, setIsWritter] = useState(false);
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _post = await getPostById(postId);
        setPost(_post);
        setIsWritter(_post.userAddress === globalState);
        const convertedContent = convertBrToNewLine(_post.content);
        setContent(convertedContent);
      } catch (e) {
        console.error('Error fetching post: ', e);
      }
    };

    fetchData();
  }, [postId, globalState]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const convertBrToNewLine = (content) => {
    return content.replace(/<br>/g, '\n');
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('Do you really want to delete this post?');

    if (confirmation) {
      await deletePost(post, globalState);
      navigate('/site');
    }
  };

  const handleModify = async () => {
    alert('Not ready..');
  }

  return (
    <div>
      <div className={styles.container}>
        {isWritter && (
          <div className={styles['post-delete']}>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleModify}>Modify</button>
          </div>
        )}
        <div>
          <h1>{post.title}</h1>
          <ReactMarkdown 
            remarkPlugins={[gfm]} 
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    children={String(children).replace(/<br>/g, '\n')}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            children={content} />
        </div>
      </div>
    </div>
  );
}
