import { useEffect, useState } from 'react';
import styles from '../styles/pages/PostDetailPage.module.css';
import DOMPurify from "dompurify";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';
import { useAuth } from '../contexts/AuthContext';
import Comment from '../components/CommentComponent'
import FavoriteSVG from '../assets/icon/favorite.svg?react';
import type { Board } from '../pages/BoardPage';

export type PostComment = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    member: {
        email: string;
        nickname: string;
    };
    children_comment: PostComment[]
}

export type Reaction = {
    member: {
        email: string;
        nickname: string;
    },
    reactionCode: {
        code: string;
        name: string;
    }
}

const PostDetailPage = () => {

    const {user, accessToken} = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [memberEmail, setMemberEmail] = useState("");
    const [board, setBoard] = useState<Board>();
    const [reactions, setReactions] = useState<Reaction[]>([]);

    const {categoryCode, postId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    DOMPurify.addHook('uponSanitizeElement', (node, data) => {
        if(data.tagName === 'iframe') {
            const el = node as Element;
            const src = el.getAttribute('src') || '';
            const allowedSrc = ['https://www.youtube.com/embed/', 'https://www.dailymotion.com/embed/']

            const isAllowed = allowedSrc.some(prefix => src.startsWith(prefix));
            if(!isAllowed)
                el.remove()
        }
    })

    useEffect(() => {
        fetch((`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}`), {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(data => {
            const santiizedContent = DOMPurify.sanitize(data.content, {
                ADD_TAGS: ["iframe"],
                ADD_ATTR: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
            });

            setTitle(DOMPurify.sanitize(data.title));
            setContent(santiizedContent);

            setMemberEmail(data.member.email);
            setBoard(data.board);
        })
        .catch(err => console.error(err));

        fetch((`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/reactions`), {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(res => {
            setReactions(res);
        })
        .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('읽기 권한이 없습니다.');
            navigate(-1);
        };
    }, [board])

    const handleEdit = () => {
        if(!confirm('글을 수정하시겠습니까?')) return;
        navigate(`${location.pathname}/edit`);
    }

    const handleDelete = () => {
        if(!confirm('글을 삭제하시겠습니까?')) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then((res) =>{
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            alert('글이 삭제되었습니다.');
            navigate(-1);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    const handleReact = () => {
        if(!user?.email) {
            alert('로그인 후 이용 가능합니다.')
            return;
        }

        let isReactionExist = reactions.some((value) => value.member.email === user.email);

        // 반응 삭제
        if (isReactionExist) {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/reactions`, {
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
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/reactions`, {
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

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <h2 className={styles.title}>{title}</h2>
                <hr />
                <div className={styles.container}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: content}}></div>
                    <div className={styles.react}>
                        <FavoriteSVG width={"24px"} height={"24px"} fill={reactions.some(value => value.member.email === user?.email) ? '#f38383ff' : 'black'} onClick={handleReact}/> {reactions.length}
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <input className={styles.cancleButton} type="button" value="목록" onClick={() => navigate(-1)} />
                    {
                    memberEmail === user?.email && board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'MODIFY' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))
                        ? 
                        <>
                            <input className={styles.editButton} type="button" value="수정" onClick={handleEdit} />
                        </>
                        :
                        ""
                    } 
                    {
                    memberEmail === user?.email && board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'DELETE' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))
                        ? 
                        <>
                            <input className={styles.deleteButton} type="button" value="삭제" onClick={handleDelete} />
                        </>
                        :
                        ""
                    } 
                </div>
            </section>
            <Comment></Comment>
        </main>
    )
}

export default PostDetailPage;