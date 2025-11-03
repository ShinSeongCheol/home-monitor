import {BoardInfo, useBoard} from "../../../entities/board";
import {CancelButton} from "../../../shared/ui";
import {CreatePostButton} from "../../../features/post/create";
import {useNavigate} from "react-router-dom";
import {usePostAccess} from "../../../features/post/access";

export const PostListWidget = () => {

    const navigate = useNavigate();

    const {isLoading, board} = useBoard();
    const {canRead, canWrite} = usePostAccess(board);

    if (isLoading) return null;

    return (
        <section className='w-full md:w-5xl p-2 md:p-0'>
            {canRead ?
                (
                    <BoardInfo board={board}/>
                ) :
                (
                    <p className="text-center text-gray-500 py-8">읽기 권한이 없습니다.</p>
                )
            }
            <div className='flex justify-end py-2 gap-2'>
                <CancelButton svg={null} type='button' value='뒤로가기' onClick={() => navigate(-1)}/>
                {canWrite && <CreatePostButton/>}
            </div>
        </section>
    )
}