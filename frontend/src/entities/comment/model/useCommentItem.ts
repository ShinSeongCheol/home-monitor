import { useState } from "react"

export const useCommentItem = () => {
    const [editCommentId, setEditCommentId] = useState<number>();
    const [editComment, setEditComment] = useState("");
    const [replyId, setReplyId] = useState<number | null>();
    const [replyComment, setReplyComment] = useState("");

    return {editCommentId, setEditCommentId, editComment, setEditComment, replyId, setReplyId, replyComment, setReplyComment};
}