import {useState} from "react";

export const useReplyForm = () => {
    const [replyComment, setReplyComment] = useState("");
    const handleReply = (id: number) => {};

    return {replyComment, setReplyComment, handleReply}
}