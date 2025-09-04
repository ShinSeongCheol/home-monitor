import { useEffect, useState } from 'react';
import BoardCardComponent from './components/BoardCardComponent';
import styles from './styles/Board.module.css';

type Board = {
    categoryCode: string;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

const Board = () => {

    const [boardList, setBoardList] = useState<Board[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(data => {
            setBoardList(data);
        })
        .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        console.log(boardList);
    }, [boardList])

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.title}>
                    <h2>게시판</h2>
                    <p>다양한 주제의 게시판을 둘러보세요.</p>
                </div>

                <div className={styles.gridContainer}>
                    {boardList.map(board => <BoardCardComponent categoryCode={board.categoryCode} categoryName={board?.categoryName ?? ""} comment={board?.comment ?? ""}/>)}
                </div>
            </section>
        </main>
    )
}

export default Board;