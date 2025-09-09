import { useEffect, useState } from 'react';
import styles from './styles/BoardPostDetail.module.css';
import DOMPurify from "dompurify";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';
import { useAuth } from './contexts/AuthContext';

const BoardPostDetail = () => {

    const {user, accessToken} = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [memberEmail, setMemberEmail] = useState("");

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
        })
        .catch(err => console.error(err));
    }, [])

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
                    {memberEmail === user?.email 
                    ? 
                    <>
                        <input className={styles.editButton} type="button" value="수정" onClick={handleEdit} />
                        <input className={styles.deleteButton} type="button" value="삭제" onClick={handleDelete} />
                    </>
                    :
                    ""
                    } 
                </div>
            </section>
        </main>
    )
}

export default BoardPostDetail;