import { useState, type FormEventHandler } from "react";
import type { PostComment } from "../BoardPostDetail";
import styles from '../styles/Comment.module.css'
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type PostCommentProps = {
    comments: PostComment[];
    setComments: React.Dispatch<React.SetStateAction<PostComment[]>>;
};

const Comment = ({comments, setComments} : PostCommentProps) => {
    const {categoryCode, postId} = useParams();
    const {accessToken} = useAuth();

    const [comment, setComment] = useState("");

    const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(
                {
                    comment: comment
                }
            )
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            setComments((prev) => [...prev, res]);
            setComment("");
            alert('댓글이 등록되었습니다!');
        })
        .catch((err: Response) => {
            if (err.status === 401) alert('권한이 없습니다.');
        })
    }

    return (
        <section className={styles.section}>
            <h2>전체 댓글 <span>{comments.length}</span>개</h2>

            {
                comments.sort((a, b) => a.id - b.id).map((value) => (
                    <div className={styles.comments} key={value.id}>
                        <div>{value.member.nickname}</div>
                        <p>{value.content}</p>
                        <div>{new Date(value.createdAt).toLocaleString()}</div>
                    </div>
                ))
            }

            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                <div className={styles.buttonContainer}>
                    <input type="submit" value="등록" />
                </div>
            </form>
        </section>
    )
}

export default Comment;