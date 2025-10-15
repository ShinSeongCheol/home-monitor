import {InsertButton} from "../../../../shared/ui";
import {useReplyButton} from "../model/useReplyButton.ts";
import {ReplyForm} from "./ReplyForm.tsx";

type ReplyProps = {
    id: number|undefined;
    content: string;
}

export const ReplyButton = ({id, content}: ReplyProps) => {

    const {isReplying, handleClick} = useReplyButton();

    return (
        <>
            <InsertButton value={"답글"} type={"button"} onClick={handleClick}/>
            {isReplying && <ReplyForm />}
        </>
    )
}