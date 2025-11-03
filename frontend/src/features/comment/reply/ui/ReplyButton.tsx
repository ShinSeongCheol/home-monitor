import {InsertButton} from "../../../../shared/ui";

type ReplyProps = {
    handleClick: () => void;
}

export const ReplyButton = ({handleClick}: ReplyProps) => {

    return (
        <InsertButton value={"답글"} type={"button"} onClick={handleClick}/>
    )
}