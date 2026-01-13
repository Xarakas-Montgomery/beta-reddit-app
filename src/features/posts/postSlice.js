import { createSlice } from "@reduxjs/toolkit";
import { dummyPosts } from "../../pages/DummyData/dummyData";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        posts: []
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        storePost: (state, action) => {
            state.post = action.payload
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
});

//Selectors
export const selectPost = (state) => state.post.post;
export const selectPosts = (state) => state.post.posts;

//Exporting reducers
export const { addPost, storePost, setPosts } = postSlice.actions;
export default postSlice.reducer;
    
