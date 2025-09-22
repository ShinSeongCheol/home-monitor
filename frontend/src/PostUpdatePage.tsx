import CkEditorComponent from "./components/CkEditorComponent";
import styles from './styles/BoardPostCreateComponent.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useState, type FormEventHandler,  type ChangeEventHandler, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import DOMPurify from "dompurify";
import type { Board } from "./BoardPage";

const PostUpdatePage = () => {

    const {user, accessToken} = useAuth();

    const navigate = useNavigate();
    const {categoryCode, postId} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [board, setBoard] = useState<Board>();

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

            setBoard(data.board);
        })
        .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'MODIFY' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('수정 권한이 없습니다.');
            navigate(-1);
        };
    }, [board])

    //title 변경
    const handleTitleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    }

    // 게시판 수정
    const handleSubmit:FormEventHandler = (e) => {
        e.preventDefault()

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            alert('글 수정 되었습니다.');
            navigate(-1);
        })
        .catch(err => {
            console.error(err);
        })
        
    }

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.inputTitle} type="text" name="title" id="title" placeholder="제목을 입력하세요." maxLength={32} required value={title} onChange={handleTitleChange}/>
                    <hr />
                    <CkEditorComponent data={content} handleChange={(content) => setContent(content)}/>
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancleButton} type="button" value="취소" onClick={() => navigate(-1)} />
                        <input className={styles.submitButton} type="submit" value="수정"/>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default PostUpdatePage;