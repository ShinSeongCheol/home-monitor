import {EditButton} from "../../../../shared/ui";

type UpdateCommentProps = {
    id: number;
}

export const UpdateComment = ({id}: UpdateCommentProps) => {
    return (
        <>
            <EditButton value={"수정"} type={"button"} />
        </>
    )
}