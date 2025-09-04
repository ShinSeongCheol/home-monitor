import { useEffect, useState } from 'react';
import BoardCardComponent from './components/BoardCardComponent';
import styles from './styles/Board.module.css';

type Board = {
    categoryCode: string;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    posts: Post[];
}

type Post = {
    id: number;
    title: string | null;
    content: string | null;
    view: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    member: {
        email: string | null;
        nickname: string | null;
    }
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

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.title}>
                    <h2>게시판</h2>
                    <p>다양한 주제의 게시판을 둘러보세요.</p>
                </div>

                <div className={styles.gridContainer}>
                    {boardList.map(board => <BoardCardComponent categoryCode={board.categoryCode} categoryName={board?.categoryName ?? ""} comment={board?.comment ?? ""} count={board?.posts.length} latestPost={board?.posts.reduce((latest, post) => {
                        if (!latest) return post;
                        if (!post.createdAt) return latest;
                        if (!latest.createdAt) return post;
                        return post.createdAt > latest.createdAt ? post: latest;
                    })}/>)}
                </div>
            </section>
        </main>
    )
}

export default Board;