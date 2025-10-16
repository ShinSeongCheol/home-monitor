import {EditButton} from "../../../../shared/ui";
import {useUpdateComment} from "../model/useUpdateComment.ts";

type UpdateCommentProps = {
    id: number | undefined;
    content: string;
    fetchData: () => void;
    isEdit: boolean;
    handleIsEdit: (isEdit: boolean) => void;
}

export const UpdateComment = ({id, content, fetchData, isEdit, handleIsEdit}: UpdateCommentProps) => {

    const {handleClick} = useUpdateComment({id, content, fetchData, isEdit, handleIsEdit});

    return (
        <>
            <EditButton value={"수정"} type={"button"} onClick={handleClick}/>
        </>
    )
}