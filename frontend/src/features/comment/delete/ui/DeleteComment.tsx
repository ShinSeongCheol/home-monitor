import {DeleteButton} from "../../../../shared/ui";
import {useDeleteComment} from "../model/useDeleteComment.ts";

type DeleteComment = {
    id: number | undefined;
    fetchData: () => void;
}

export const DeleteComment = ({id, fetchData}: DeleteComment) => {

    const {handleDelete} = useDeleteComment(id, fetchData);

    return (
        <DeleteButton value={"삭제"} type={"button"} onClick={handleDelete}/>
    )
}