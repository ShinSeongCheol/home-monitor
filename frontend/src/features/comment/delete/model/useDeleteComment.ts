import {deleteComment} from "../api/deleteComment.ts";
import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {useParams} from "react-router-dom";

export const useDeleteComment = (id: number | undefined, fetchData: () => void) => {
    const {accessToken} = useAuth();
    const {categoryCode, postId} = useParams();

    const handleDelete = async () => {
        if(! confirm('댓글을 삭제하시겠습니까?')) return;

        try {
            await deleteComment(categoryCode, postId, accessToken, id)
            fetchData();
            alert('댓글이 삭제되었습니다');
        }
        catch (err) {
            console.error(err);
        }
    }
    return {handleDelete};
}