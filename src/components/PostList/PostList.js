import { useSelector } from "react-redux";
import React from "react";
import { PostItem } from "../PostItem/PostItem"
import { selectPost, selectPosts } from "../../features/posts/postSlice";
import styles from "./PostList.module.css"

const PostList = ({ filteredPosts }) => {

    return (
        <div>
            <div className={styles.posts}>
                {filteredPosts && filteredPosts.length > 0 ? ( 
                    filteredPosts.map((post) => <PostItem key={post.id} post={post} />)) : (
                    <p>No posts available.</p> 
                )}
            </div>
        </div>
    );
};

export default PostList;