import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { BoardCard, getBoards, type Board } from '../../../entities/Board';

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
        <main className={'w-full h-full flex justify-center'}>
            <section className={'w-5xl mt-4 p-2'}>
                <div>
                    <h2 className={'text-3xl'}>게시판</h2>
                    <p className={'mt-2'}>다양한 주제의 게시판을 둘러보세요.</p>
                </div>

                <div className={'h-50 mt-6 grid grid-cols-2 lg:grid-cols-3 justify-center gap-4'}>
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
