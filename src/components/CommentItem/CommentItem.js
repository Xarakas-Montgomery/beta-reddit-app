import React from "react";
import styles from './CommentItem.module.css'
import logoAvatar from '../../media/avatarLogo.png'

export const CommentItem = ({author, avatar, body, date, replies, isReply}) => {

    return (
        <div className={`${styles.commentItem} ${isReply ? styles.replyItem : ''}`}>
            <img src={avatar} alt={author} className={styles.avatar}/>

            <div className={styles.commentContent}>
                <div className={`${styles.author} ${isReply ? styles.replyAuthor : ''}`}>{author} 
                    {isReply && <span className={styles.replyTag}><br/>Replied:</span> }</div> 
                <div className={`${styles.comment} ${isReply ? styles.replyComment : ''}`}>{body}
                    <br />
                    <small className={styles.date}>{date}</small>
                </div>

                {/* Render nested replies recursively */}
                {replies && replies.length > 0 && (
                <div className={styles.replies}>
                    {replies.map((reply) => (
                    <CommentItem
                        key={reply.id}
                        author={reply.author}
                        avatar={reply.avatar || logoAvatar} // or placeholder
                        body={reply.body}
                        date={reply.date}
                        replies={reply.replies} // recursive
                        isReply={true}
                    />
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};