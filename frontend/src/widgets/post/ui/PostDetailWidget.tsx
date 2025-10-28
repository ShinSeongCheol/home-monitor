import {PostDetail} from "../../../entities/post";
import {PostReaction} from "../../../features/reaction";
import {CancleButton} from "../../../components/ButtonComponent.tsx";
import {UpdatePostButton} from "../../../features/post/update";
import {DeletePostButton} from "../../../features/post/delete";
import {Comment} from "../../Comment";
import {usePostDetail} from "../../../entities/post";
import {useNavigate} from "react-router-dom";

export const PostDetailWidget = () => {

    const {post} = usePostDetail();
    const navigate = useNavigate();

    return (
        <section className={'w-full lg:w-5xl'}>

            <PostDetail post={post} postReaction={<PostReaction/>}/>

            <div className={'flex justify-end mt-2 gap-2'}>
                <CancleButton svg={null} type='button' value='목록' onClick={() => navigate(-1)}/>
                <UpdatePostButton post={post}/>
                <DeletePostButton post={post}/>
            </div>

            <Comment/>
        </section>
    )
}