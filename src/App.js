import React , { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPost, selectPosts, setPosts } from "./features/posts/postSlice";
import {
  Route,
  BrowserRouter,
  Routes, 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Link
} from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage"
import { PostDetail } from "./components/PostDetail/PostDetail";
import './App.css';
import { Header } from "./components/Header/Header";
import { getSubredditPosts } from "./features/reddit/Reddit";

function App() {

  const posts = useSelector(selectPosts);

  const dispatch = useDispatch()

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await getSubredditPosts('all'/*, 'popular'*/);
      dispatch(setPosts(fetchedPosts));
    }
    loadPosts();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/post/:id' element={<PostDetail/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
