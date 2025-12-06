import {BoardCard} from "../../../entities/board";
import {useReadableBoard} from "../../../features/board/access";

export const BoardListWidget = () => {

    const {filteredReadableBoards} = useReadableBoard()

    return (
        <section className={'w-full max-w-5xl mx-auto mt-4 p-2'}>
            <div>
                <h2 className={'text-3xl'}>게시판</h2>
                <p className={'mt-2'}>다양한 주제의 게시판을 둘러보세요.</p>
            </div>

            <div className={'h-50 mt-6 grid grid-cols-2 lg:grid-cols-3 justify-center gap-4'}>
                {
                    filteredReadableBoards.map(board => <BoardCard key={board.categoryCode} categoryCode={board.categoryCode} categoryName={board?.categoryName ?? ""} comment={board?.comment ?? ""} count={board?.posts.length} latestPost={board?.posts.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())[0]}/>)
                }
            </div>
        </section>
    )
}