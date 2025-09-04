import BoardCardComponent from './components/BoardCardComponent';
import styles from './styles/Board.module.css';

const Board = () => {
    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.title}>
                    <h2>게시판</h2>
                    <p>다양한 주제의 게시판을 둘러보세요.</p>
                </div>

                <div className={styles.gridContainer}>
                    <BoardCardComponent categoryCode='1' categoryName='업데이트 공지'/>
                    <BoardCardComponent categoryCode='2' categoryName='공지사항'/>
                    <BoardCardComponent categoryCode='3' categoryName='기술 블로그'/>
                    <BoardCardComponent categoryCode='4' categoryName='보안 업데이트'/>
                    <BoardCardComponent categoryCode='5' categoryName='커뮤니티'/>
                    <BoardCardComponent categoryCode='6' categoryName='설정 가이드'/>
                </div>
            </section>
        </main>
    )
}

export default Board;