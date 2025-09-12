import { useEffect, useState } from 'react';
import styles from './styles/BoardPostDetail.module.css';
import DOMPurify from "dompurify";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';
import { useAuth } from './contexts/AuthContext';
import Board from './Board';
import Comment from './components/CommentComponent'

export type PostComment = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    member: {
        email: string;
        nickname: string;
    }   
}

const BoardPostDetail = () => {

    const {user, accessToken} = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [memberEmail, setMemberEmail] = useState("");
    const [board, setBoard] = useState<Board>();
    const [comments, setComments] = useState<PostComment[]>([]);

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
            setComments(data.comments);
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

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <h2 className={styles.title}>{title}</h2>
                <hr />
                <div className={styles.container}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: content}}></div>
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
            <Comment comments={comments} setComments={setComments}></Comment>
        </main>
    )
}

export default BoardPostDetail;