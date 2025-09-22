import CkEditorComponent from "./components/CkEditorComponent";
import styles from './styles/BoardPostCreateComponent.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useState, type FormEventHandler,  type ChangeEventHandler, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import type { Board } from "./BoardPage";

const PostCreatePage = () => {

    const {user,accessToken} = useAuth();

    const navigate = useNavigate();
    const {categoryCode} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [board, setBoard] = useState<Board>();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}`)
        .then(res => {
            if (!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(data => {
            setBoard(data);
        })
        .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'WRITE' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('쓰기 권한이 없습니다.');
            navigate(-1);
        };
    }, [board])

    //title 변경
    const handleTitleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    }

    // 게시판 등록
    const handleSubmit:FormEventHandler = (e) => {
        e.preventDefault()

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/post`, {
            method: 'POST',
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
            alert('글 등록 되었습니다.');
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
                    <CkEditorComponent data="" handleChange={(content) => setContent(content)}/>
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancleButton} type="button" value="목록" onClick={() => navigate(-1)} />
                        <input className={styles.submitButton} type="submit" value="등록"/>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default PostCreatePage;