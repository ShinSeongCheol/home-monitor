import {PostCreateForm} from "../../../features/post/create";
import {usePostAccess} from "../../../features/post/access";
import {useBoard} from "../../../entities/board";

export const PostCreateWidget = () => {

    const {isLoading, board} = useBoard();
    const {canWrite} = usePostAccess(board);

    if (isLoading) return null;

    return (
        <section className={'w-full lg:w-5xl h-full'}>
            {canWrite ? (<PostCreateForm/>) : (<p className="text-center text-gray-500 py-8">쓰기 권한이 없습니다.</p>)}
        </section>
    )
}