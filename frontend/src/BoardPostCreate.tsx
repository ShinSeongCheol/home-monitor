import CkEditorComponent from "./components/CkEditorComponent";
import styles from './styles/BoardPostCreateComponent.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEventHandler } from "react";

const BoardPostCreateComponent = () => {

    const navigate = useNavigate();
    const [content, setContent] = useState("");

    useEffect(() => {
        console.log(content);
    },[content])

    // 게시판 등록
    const handleSubmit:FormEventHandler = (e) => {
        e.preventDefault();

    }

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <form className={styles.form}>
                    <input className={styles.inputTitle} type="text" name="title" id="title" placeholder="제목을 입력하세요."/>
                    <hr />
                    <CkEditorComponent value="글쓰기" handleChange={(content) => setContent(content)}/>
                    <div className={styles.buttonContainer}>
                        <input className={styles.cancleButton} type="button" value="목록" onClick={() => navigate(-1)} />
                        <input className={styles.submitButton} type="submit" value="등록" onClick={() => handleSubmit}/>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default BoardPostCreateComponent;