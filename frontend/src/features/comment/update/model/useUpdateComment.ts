import {updateComment} from "../api/updateComment.ts";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../shared";

type useUpdateCommentProps = {
    id: number | undefined;
    content: string;
    isEdit: boolean;
    handleIsEdit: (isEdit: boolean) => void;
    fetchData: () => void;
}

export const useUpdateComment = ({id, content, fetchData, isEdit, handleIsEdit}: useUpdateCommentProps) => {

    const {auth} = useAuth();
    const {categoryCode, postId} = useParams();

    const handleClick = async () => {
        if(!isEdit) return handleIsEdit(true);
        try {
            await updateComment(categoryCode, postId, auth?.accessToken, id, content)
            fetchData();

            handleIsEdit(false);
        }
        catch(err) {
            console.error(err);
        }
    }

    return {handleClick};
}