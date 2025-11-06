import {PostDetail} from "../../../entities/post";
import {PostReaction} from "../../../features/reaction";
import {CancleButton} from "../../../components/ButtonComponent.tsx";
import {UpdatePostButton} from "../../../features/post/update";
import {DeletePostButton} from "../../../features/post/delete";
import {usePostDetail} from "../../../entities/post";
import {useNavigate} from "react-router-dom";
import {useBoard} from "../../../entities/board";
import {usePostAccess} from "../../../features/post/access";

export const PostDetailWidget = () => {

    const navigate = useNavigate();
    const {isLoading, board} = useBoard();
    const {post} = usePostDetail();
    const {canRead, canModify, canDelete} = usePostAccess(board, post);

    if(isLoading) return null;

    return (
        <>
            {canRead ?
                (
                    <PostDetail post={post} postReaction={<PostReaction/>}/>
                )
                :
                (
                    <p className="text-center text-gray-500 py-8">읽기 권한이 없습니다.</p>
                )
            }

            <div className={'flex justify-end mt-2 gap-2'}>
                <CancleButton svg={null} type='button' value='목록' onClick={() => navigate(-1)}/>
                {canModify && <UpdatePostButton/>}
                {canDelete && <DeletePostButton/>}
            </div>
        </>
    )
}