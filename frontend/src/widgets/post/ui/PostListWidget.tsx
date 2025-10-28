import {BoardInfo} from "../../../entities/board";
import {CancleButton} from "../../../shared/ui";
import {CreatePostButton} from "../../../features/post/create";
import {useNavigate} from "react-router-dom";

export const PostListWidget = () => {

    const navigate = useNavigate();

    return (
        <section className='w-full md:w-5xl p-2 md:p-0'>

            <BoardInfo/>

            <div className='flex justify-end py-2 gap-2'>
                <CancleButton svg={null} type='button' value='뒤로가기' onClick={() => navigate(-1)}/>
                <CreatePostButton/>
            </div>

        </section>
    )
}