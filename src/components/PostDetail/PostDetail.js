import React from "react";
import { CommentItem } from "../CommentItem/CommentItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectPosts } from "../../features/posts/postSlice";
import styles from './PostDetail.module.css'
import { getComments } from "../../features/reddit/Reddit";
import logoAvatar from '../../media/avatarLogo.png'

export const PostDetail = ({ post: postProp }) => {

    //Extracting the 'ID' parameter from the URL in the Route, returns always a string
    const { id } = useParams();
    const [comments, setComments ] = useState([]);
    //Grabbing the posts array from the store
    const posts = useSelector(selectPosts);

    //To find the 'ID' parameter and stringify it if it's a number
    const postStore = posts.find((p) => String(p.id) === String(id));
//                           ||    
                        //It returns a single element

    //We combine them into 1 value. 1 from the post prop and the other
    //from the state of the post by the store
    const post = postProp || postStore;



    useEffect(() => {
        if (!post?.permalink) return;

    async function loadComments() {
        try {
            const fetchedComments = await getComments(post.permalink);
            setComments(fetchedComments);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
            setComments([]); // Clear comments on error
        }
    }
        loadComments();
    }, [post])

    //Condition to check if both of them exists
    if (!post) {
        return <p>No Posts found.</p>
    }

    //Destructuring to extract the properties so we can use it later
    const { title, thumbnail, ups, num_comments, selftext, author, date, description } = post;

    //Condition to check the image validation
    /*const isValidThumbnail =
    thumbnail &&
    thumbnail !== "self" &&
    thumbnail !== "default" &&
    thumbnail !== "nsfw" &&
    thumbnail.startsWith("https");
    console.log(thumbnail);*/

  return (
    <div className={styles.postDetail}>
      <h2>{title}</h2>

      
        <img src={thumbnail} alt="Thumbnail" className={styles.image} />
      

      <p className={styles.selftext}>{selftext}</p>

      <div className={styles.authorCont}>
        Posted by <span className={styles.author}>{author}</span> {date}
      </div>

      <div className={styles.description}>
        {description}
      </div>

      <div className={styles.stats}>
        <span>⬆️ {ups} Likes</span> | <span>💬 {num_comments} Comments</span>
      </div>

      <h2>Comments</h2>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            avatar={comment.avatar || logoAvatar}
            body={comment.body}
            date={comment.date}
            replies={comment.replies}
            isReply={false}
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}