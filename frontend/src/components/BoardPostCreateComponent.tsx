import CkEditorComponent from "./CkEditorComponent";
import styles from '../styles/BoardPostCreateComponent.module.css';
import { useNavigate } from "react-router-dom";
import type { FormEventHandler } from "react";

const BoardPostCreateComponent = () => {

    const navigate = useNavigate();

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
                    <CkEditorComponent value="글쓰기" onChange={() => console.log("글쓰기")}/>
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