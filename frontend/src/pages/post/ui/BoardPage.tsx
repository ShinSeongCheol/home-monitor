import { useEffect, useState } from 'react';
import styles from './BoardPage.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { BoardCard, getBoards, type Board } from '../../../entities/board';

export const BoardPage = () => {

    const {user} = useAuth();
    const [boardList, setBoardList] = useState<Board[]>([]);

    useEffect(() => {

        getBoards()
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
                    {
                        boardList
                        .filter(board => board.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode?.code ?? ""))))
                        .map(board => <BoardCard key={board.categoryCode} categoryCode={board.categoryCode} categoryName={board?.categoryName ?? ""} comment={board?.comment ?? ""} count={board?.posts.length} latestPost={board?.posts.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())[0]}/>)
                    }
                </div>
            </section>
        </main>
    )
}
