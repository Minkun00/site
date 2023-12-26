import './App.css';
import React from 'react'
import PostForm from './components/Posting/PostForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WrittenPosts from './components/Main/WrittenPosts';
import FullPost from './components/FullPosts/FullPosts';
import NavigationBar from './components/NavBar/NavigationBar';
import { SiteProvider } from './components/context';
import Owner from './components/Owner/Owner';
import WelcomePage from './components/Welcome/Welcome';

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
      <SiteProvider>
        <div>
          <NavigationBar/>
        </div>
        <div className='default'>
          <Routes>
            <Route path="/posting" element={<PostForm/>}/> 
            <Route path="/site" element={<WrittenPosts/>}/>
            <Route path="/posts/:postId" element={<FullPost/>}/>
            <Route path="/owner" element={<Owner/>}/>
            <Route path='/' element={<WelcomePage/>} />
          </Routes>
        </div>
      </SiteProvider>
    </BrowserRouter>
  );
};