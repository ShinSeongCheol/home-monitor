import { useState, type FormEventHandler, type MouseEventHandler } from "react";
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
    const {user, accessToken} = useAuth();

    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState<number| null>(null);
    const [editComment, setEditComment] = useState<string | null>(null);

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

    const handleUpdate = (value: PostComment) => {
        if(! confirm('댓글을 수정하시겠습니까?')) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                comment: editComment
            })
        })
        .then(res => {
            if (!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(res => {
            setComments((prev) => [...prev.filter(comment => comment.id !== value.id), res]);
            setEditComment("");
            setEditCommentId(null);
            alert('댓글이 수정되었습니다.');
        })
        .catch(err => console.error(err))
    }

    const handleDelete = (value: PostComment) => {
        if(! confirm('댓글을 삭제하시겠습니까?')) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${value.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Http Error ${res.status}`);
            setComments(prev => prev.filter(comment => comment.id !== value.id));
            alert('댓글이 삭제되었습니다');
        })
        .catch(err => console.error(err))
    }

    return (
        <section className={styles.section}>
            <h2>전체 댓글 <span>{comments.length}</span>개</h2>

            {
                comments.sort((a, b) => a.id - b.id).map((value) => (
                    <div key={value.id} className={styles.comments}>
                        <div className={styles.commentContent}>
                            <div>{new Date(value.createdAt).toLocaleString()}</div>
                            <div>{value.member.nickname}</div>
                            {
                                value.id === editCommentId
                                ?
                                <textarea name="comment" id="comment" value={editComment ?? ""} onChange={(e) => setEditComment(e.target.value)}></textarea>
                                :
                                <p>{value.content}</p>
                            }
                        </div>

                        {
                            value.member.email === user?.email
                            ?
                            <div className={styles.buttonContainer}>
                                <input className={styles.editButton} type="button" value="수정" onClick={() => {
                                    if (value.id === editCommentId) {
                                        handleUpdate(value);
                                    }else {
                                        setEditCommentId(value.id);
                                        setEditComment(value.content);
                                    }
                                }}/>
                                <input className={styles.deleteButton} type="button" value="삭제" onClick={() => handleDelete(value)} />
                            </div>
                            :
                            ""
                        }
                    </div>
                ))
            }

            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <div className={styles.buttonContainer}>
                    <input className={styles.editButton} type="submit" value="등록" />
                </div>
            </form>
        </section>
    )
}

export default Comment;