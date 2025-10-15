import {DeleteButton} from "../../../../shared/ui";

type DeleteComment = {
    id: number;
}

export const DeleteComment = ({id}: DeleteComment) => {

    return (
        <>
            <DeleteButton value={"삭제"} type={"button"}/>
        </>
    )
}