import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/BoardList.module.css';

const BoardList = () => {

    const naviagte = useNavigate();
    const location = useLocation();

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.listContainer}>
                    <ul className={`${styles.board_list} ${styles.first_list}`}>
                        <li>번호</li>
                        <li>제목</li>
                        <li>작성자</li>
                        <li>작성일</li>
                        <li>조회수</li>
                    </ul>

                    <div className={styles.contentListContainer}>
                        <ul className={`${styles.board_list}`}>
                            <li>3</li>
                            <li>제목3 입니다.</li>
                            <li>작성자3</li>
                            <li>2025-09-04 13:10:27</li>
                            <li>3</li>
                        </ul>

                        <ul className={`${styles.board_list}`}>
                            <li>2</li>
                            <li>제목2 입니다.</li>
                            <li>작성자2</li>
                            <li>2025-09-04 12:00:00</li>
                            <li>2</li>
                        </ul>

                        <ul className={`${styles.board_list}`}>
                            <li>1</li>
                            <li>제목1 입니다.</li>
                            <li>작성자1</li>
                            <li>2025-09-04 11:00:00</li>
                            <li>1</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <input className={styles.cancleButton} type="button" value="뒤로가기" onClick={() => naviagte(-1)} />
                    <input className={styles.submitButton} type="button" value="글쓰기" onClick={() => naviagte(`${location.pathname}/post`)} />
                </div>
            </section>
        </main>
    )
}

export default BoardList;