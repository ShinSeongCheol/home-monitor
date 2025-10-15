import {InsertButton} from "../../../../shared/ui";

type ReplyProps = {
    id: number;
}

export const Reply = ({id}: ReplyProps) => {
    return (
        <>
            <InsertButton value={"답글"} type={"button"}/>
        </>
    )
}