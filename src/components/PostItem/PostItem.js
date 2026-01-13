import React from 'react';
import { PostDetail } from '../PostDetail/PostDetail';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';
import logoAvatar from '../../media/avatarLogo.png'
import commentIcon from '../../media/commentIcon.png'

export const PostItem = ({ post }) => {
    // A guard clause to prevent errors if the post prop is undefined
    if (!post) {
        return null;
    }

    const { id, title, author, thumbnail, ups, num_comments, selftext } = post;
    const formattedDate = post.date || '';

    /*const isValidThumbnail =
    thumbnail &&
    thumbnail !== 'self' &&
    thumbnail !== 'default' &&
    thumbnail !== 'nsfw' &&
    thumbnail.startsWith('https');
    console.log(thumbnail);*/

    return (
        <div className={styles.postItem}>
            <Link to={`/post/${id}`} className={styles.linkTitle} >
                <h2 className={styles.title}>{title}</h2>
            </Link> 
                  
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className={styles.image}
                    />
                    
                <p className={styles.selfText}>{selftext}</p>
                <div className={styles.stats}>
                    <span className={styles.authorCont}>
                        Posted by <strong className={styles.author}>{author}</strong> 
                        <span className={styles.date}> {formattedDate && ` ${formattedDate}`}</span> |
                    </span>
                    <br/>
                    <span className={styles.ups}> ⬆ {ups} </span>
                    <span className={styles.comment}><img src={commentIcon} alt="Comments" className={styles.commentIcon} /> {num_comments}</span>
                </div>

            {post.comments && post.comments.length > 0 && (
                <div className={styles.postFirstComment}>
                    <img
                        src={post.comments[0].avatar || logoAvatar}
                        alt="User's avatar."
                        className={styles.avatar}
                    />
                    {/* COMMENT PREVIEW

                        This div was a test so that the preview of the first comment
                        was showing below each post in postItem (not postDetails which
                        has a different purpose).

                        This feature is not working as it should when
                        we switched from DummyData to API and fetching
                        every first comment of every single post
                        makes the app slower because of the requests prending.

                        Still, there's a way to do it but I decided to skip
                        on this one.
                                        */}
                    <div>
                        <p className={styles.commentUser}>{post.comments[0].author}</p>
                        <p className={styles.commentText}>{post.comments[0].body}</p>
                        <small className={styles.commentDate}>{post.comments[0].date}</small>
                    </div>
                </div>
            )}
        </div>
    );
};
