import { useEffect, useState } from 'react';
import BoardCardComponent from '../components/BoardCardComponent';
import styles from '../styles/pages/BoardPage.module.css';
import { useAuth } from '../contexts/AuthContext';

export type Board = {
    categoryCode: string;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    posts: Post[];
    boardRoles: BoardRole[];
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

type BoardRole = {
    boardRoleCode: BoardRoleCode;
    memberRoleCode: MemberRoleCode | null;
}

type BoardRoleCode = {
    code: string;
    name: string;
}

type MemberRoleCode = {
    code: string;
    name: string;
}

const BoardPage = () => {

    const {user} = useAuth();
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
                    {
                        // [...boardList.filter(board => board.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ')), ...boardList.filter(board => board.boardRoles.some(boardRole => user?.authorities.includes(boardRole.memberRoleCode?.code ?? "")))]
                        // .filter((board, index, self) => index === self.findIndex(b => b.categoryCode === board.categoryCode))
                        boardList
                        .filter(board => board.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode?.code ?? ""))))
                        .map(board => <BoardCardComponent key={board.categoryCode} categoryCode={board.categoryCode} categoryName={board?.categoryName ?? ""} comment={board?.comment ?? ""} count={board?.posts.length} latestPost={board?.posts.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())[0]}/>)
                    }
                </div>
            </section>
        </main>
    )
}

export default BoardPage;