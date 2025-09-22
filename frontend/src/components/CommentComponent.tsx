import { useEffect, useState, type FormEventHandler } from "react";
import styles from '../styles/components/Comment.module.css';
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FavoriteSVG from '../assets/icon/favorite.svg?react';
import type { Reaction } from "../pages/PostDetailPage";

type CommentProps = {
    id: number;
    content: string;
    member: {
        email: string;
        nickname: string;
    };
    createdAt: Date;
    updatedAt: Date;
    children_comment: CommentProps[];
    reactions: Reaction[];
}

type CommentItemProps = {
    comment: CommentProps;
    fetchComment: () => void;
}

const CommentItem = ({comment, fetchComment}: CommentItemProps) => {
    const {categoryCode, postId} = useParams();
    const {user, accessToken} = useAuth();
    
    const [editCommentId, setEditCommentId] = useState<number| null>(null);
    const [editComment, setEditComment] = useState<string | null>(null);

    const [replyingId, setReplyingId] = useState<number | null>(null);
    const [replyComment, setReplyComment] = useState<string | null>(null);

    const [reactions, setReactions] = useState<Reaction[]>(comment.reactions);

    const handleUpdate = (id: number) => {
        if(! confirm('댓글을 수정하시겠습니까?')) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${id}`, {
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
            console.log(res);
            fetchComment();
            setEditComment("");
            setEditCommentId(null);
            alert('댓글이 수정되었습니다.');
        })
        .catch(err => console.error(err))
    }

    const handleDelete = (id: number) => {
        if(! confirm('댓글을 삭제하시겠습니까?')) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`Http Error ${res.status}`);
            fetchComment();
            alert('댓글이 삭제되었습니다');
        })
        .catch(err => console.error(err))
    }

    // 댓글 달기
    const handleReply = (id: number) => {

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${id}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(
                {
                    comment: replyComment
                }
            )
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            console.log(res);
            fetchComment();
            setReplyingId(null);
            setReplyComment(null);
            alert('댓글이 등록되었습니다!');
        })
        .catch((err: Response) => {
            if (err.status === 401) alert('권한이 없습니다.');
        })
    }

    const handleReact = (commentId: number) => {
        if(!user?.email) {
            alert('로그인 후 이용 가능합니다.')
            return;
        }

        let isReactionExist = reactions.some((value) => value.member.email === user.email);

        // 반응 삭제
        if (isReactionExist) {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${commentId}/reactions`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    code: "HEART"
                })
            })
            .then(res => {
                if (!res.ok) throw new Error(`Http Error ${res.status}`);
                setReactions(reactions.filter((value) => value.member.email !== user.email));
            })
            .catch(err => console.error(err));

        //반응 추가
        }else {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment/${commentId}/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    code: "HEART"
                })
            })
            .then(res => {
                if (!res.ok) throw new Error(`Http Error ${res.status}`);
                return res.json();
            })
            .then(res => {
                setReactions((prev) => [...prev, res]);
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <div className={styles.comment}>
            <div className={styles.meta}>
                <span className={styles.author}>{comment.member.nickname}</span>
                <span className={styles.date}>{`${new Date(comment.createdAt).toLocaleString()}`}</span>
            </div>

            <div className={styles.content}>
                {
                    comment.id === editCommentId
                    ?
                    <textarea name="comment" id="comment" value={editComment ?? ""} onChange={(e) => setEditComment(e.target.value)}></textarea>
                    :
                    <p>{comment.content}</p>
                }

                
                <div className={styles.buttonContainer}>
                    <div className={styles.react}>
                        <FavoriteSVG width={"24px"} height={"24px"} fill={reactions.some((value) => value.member.email === user?.email) ? '#f38383ff' : 'black'} onClick={() => handleReact(comment.id)} /> {reactions.length}
                    </div>

                    <div className={styles.actions}>
                        {user?.email && 
                            <input className={styles.reply_btn} type="button" value="답글" onClick={() => setReplyingId(comment.id)} />
                        }
                        {
                        comment.member.email === user?.email && 
                            <>
                                <input className={styles.edit_btn} type="button" value="수정" onClick={() => {
                                    if (comment.id === editCommentId) {
                                        handleUpdate(comment.id);
                                    } else {
                                        setEditCommentId(comment.id);
                                        setEditComment(comment.content);
                                    }
                                }} />
                                <input className={styles.delete_btn} type="button" value="삭제" onClick={() => handleDelete(comment.id)} />
                            </>
                        }
                    </div>
                </div>
                

                {replyingId === comment.id &&
                    (
                        <div className={styles.reply}>
                            <textarea name="replyComment" id="replyComment" value={replyComment ?? ""} onChange={(e) => setReplyComment(e.target.value)}></textarea>
                            <div className={styles.actions}>
                                <input className={styles.reply_btn} type="button" value="등록" onClick={() => handleReply(comment.id)} />
                                <input className={styles.cancle_btn} type="button" value="취소" onClick={() => setReplyingId(null)} />
                            </div>
                        </div>
                    )
                }

                {
                comment.children_comment && comment.children_comment.length > 0 && (
                    comment.children_comment.map((children_comment) => {
                        return (
                            <div className={styles.replies}>
                                <CommentItem key={children_comment.id} comment={children_comment} fetchComment={fetchComment}></CommentItem>
                            </div>
                        )
                    })
                    )
                }
            </div>

        </div>
    )
}

const Comment = () => {
    const {categoryCode, postId} = useParams();
    const {user, accessToken} = useAuth();

    const [comments, setComments] = useState<CommentProps[]>();
    const [comment, setComment] = useState("");

    // 댓글 조회
    const fetchComment = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(res => {
            setComments(res);
        })
        .catch(err => console.error(err));
    }
    
    // 초기 마운트 시 댓글 조회
    useEffect(() => {
        fetchComment();
    }, [])

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
            console.log(res);
            fetchComment();
            setComment("");
            alert('댓글이 등록되었습니다!');
        })
        .catch((err: Response) => {
            if (err.status === 401) alert('권한이 없습니다.');
        })
    }

    function countAllChildren(comments: CommentProps[]): number {
        return comments.reduce((acc, comment) => {
            return acc + 1 + countAllChildren(comment.children_comment ?? []);
        }, 0);
    }

    return (
        <section className={styles.section}>
            <h2>전체 댓글 <span>{countAllChildren(comments ?? [])}</span>개</h2>

            {
                comments?.sort((a, b) => a.id - b.id).map((comment) => (
                    <CommentItem key={comment.id} comment={comment} fetchComment={fetchComment}></CommentItem>
                ))
            }

            {user?.email && 
                <form className={styles.comment} onSubmit={handleSubmit}>
                    <div className={styles.content}>
                        <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <div className={styles.actions}>
                            <input className={styles.reply_btn} type="submit" value="등록" />
                        </div>
                    </div>
                </form>
            }
        </section>
    )
}

export default Comment;