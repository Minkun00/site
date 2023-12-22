// import './App.css';
import React from 'react'
import PostForm from './components/Posting/PostForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WrittenPosts from './components/WrittenPosts/WrittenPosts';
import FullPost from './components/FullPosts/FullPosts';
import NavigationBar from './components/NavBar/NavigationBar';


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
      <div>
        <NavigationBar/>
      </div>
      <Routes>
        <Route path="/posting" element={<PostForm/>}/> 
        <Route path="/" element={<WrittenPosts/>}/>
        <Route path="/posts/:postId" element={<FullPost/>}/>
      </Routes>
    </BrowserRouter>
  );
};