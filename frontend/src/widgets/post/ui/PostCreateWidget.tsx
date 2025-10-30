import {PostCreateForm} from "../../../features/post/create";
import {usePostAccess} from "../../../features/post/access";
import {useBoard} from "../../../entities/board";
import {CancleButton} from "../../../shared/ui";
import {useNavigate} from "react-router-dom";

export const PostCreateWidget = () => {

    const navigate = useNavigate();
    const {isLoading, board} = useBoard();
    const {canWrite} = usePostAccess(board);

    if (isLoading) return null;

    return (
        <section className={'w-full lg:w-5xl h-full'}>
            {canWrite ? (<PostCreateForm/>) : (<p className="text-center text-gray-500 py-8">쓰기 권한이 없습니다.</p>)}
            <div className='flex justify-end py-2 gap-2'>
                <CancleButton svg={null} type='button' value='뒤로가기' onClick={() => navigate(-1)}/>
            </div>
        </section>
    )
}