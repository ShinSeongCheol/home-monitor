import {updateComment} from "../api/updateComment.ts";
import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {useParams} from "react-router-dom";

type useUpdateCommentProps = {
    id: number | undefined;
    content: string;
    isEdit: boolean;
    handleIsEdit: (isEdit: boolean) => void;
    fetchData: () => void;
}

export const useUpdateComment = ({id, content, fetchData, isEdit, handleIsEdit}: useUpdateCommentProps) => {

    const {accessToken} = useAuth();
    const {categoryCode, postId} = useParams();

    const handleClick = async () => {
        if(!isEdit) return handleIsEdit(true);
        try {
            await updateComment(categoryCode, postId, accessToken, id, content)
            fetchData();

            handleIsEdit(false);
        }
        catch(err) {
            console.error(err);
        }
    }

    return {handleClick};
}