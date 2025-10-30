import {deletePost} from "../api/deletePost.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../../contexts/AuthContext.tsx";

export const useDeletePostButton = () => {

    const {accessToken} = useAuth();
    const {categoryCode, postId} = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!confirm('글을 삭제하시겠습니까?')) return;

        try {
            await deletePost(categoryCode, postId, accessToken);
            navigate(-1);
        }catch (err) {
            console.error(err);
        }
    }

    return {handleDelete}

}