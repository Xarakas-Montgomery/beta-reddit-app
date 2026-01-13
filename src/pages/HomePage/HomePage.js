import React , { useState } from "react";
import PostList from "../../components/PostList/PostList";
import { useSelector } from "react-redux";
import { selectPost, selectPosts } from "../../features/posts/postSlice";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import styles from './HomePage.module.css'


export const HomePage = () => {

    const [term, setTerm] = useState('');
    const posts = useSelector(selectPosts);

    const filteredPosts = posts.filter((post) => 
        post.title.toLowerCase().includes(term.toLowerCase()) || 
        post.selftext.toLowerCase().includes(term.toLowerCase())
    );

    return (
    <div> 
      <SearchBar term={term} setTerm={setTerm} />
      <div className={styles.post}>
        <PostList filteredPosts={filteredPosts}/>
      </div>
      <div className={styles.footer}>
        <small>@ MADE BY Xarakas</small>
      </div>
    </div>
  );
};