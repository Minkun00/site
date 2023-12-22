// import './App.css';
import React from 'react'
import PostForm from './components/PostForm/PostForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WrittenPosts from './components/WrittenPosts/WrittenPosts';
import FullPost from './components/FullPosts/FullPosts';

export default function App() {
  return (
    <>
      <Router/>
    </>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/posting" element={<PostForm/>}/> 
        <Route path="/" element={<WrittenPosts/>}/>
      </Routes>
      <div>
        <Link to="/posting">Posting</Link>
      </div>
    </BrowserRouter>
  );
};