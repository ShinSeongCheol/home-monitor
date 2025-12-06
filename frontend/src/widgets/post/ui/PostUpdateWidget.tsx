import {PostUpdateForm} from "../../../features/post/update";
import {useBoard} from "../../../entities/board";
import {usePostAccess} from "../../../features/post/access";
import {usePostDetail} from "../../../entities/post";

export const PostUpdateWidget = () => {

    const {isLoading, board} = useBoard();
    const {post} = usePostDetail();
    const {canModify} = usePostAccess(board, post);

    if (isLoading) return null;

    return(
        <>
            {canModify ? <PostUpdateForm/> : ""}
        </>
    )
}