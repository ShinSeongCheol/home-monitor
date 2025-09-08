import { useEffect, useState } from 'react';
import styles from './styles/BoardPostDetail.module.css';
import DOMPurify from "dompurify";
import { useNavigate, useParams } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';

const BoardPostDetail = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {categoryCode, postId} = useParams();
    const navigate = useNavigate();

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
        })
        .catch(err => console.error(err));
    }, [])

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.title}>{title}</div>
                <hr />
                <div className={styles.container}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: content}}></div>
                </div>

                <div className={styles.buttonContainer}>
                    <input className={styles.cancleButton} type="button" value="목록" onClick={() => navigate(-1)} />
                </div>
            </section>
        </main>
    )
}

export default BoardPostDetail;