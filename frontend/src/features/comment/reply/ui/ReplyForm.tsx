import {CancleButton, InsertButton} from "../../../../shared/ui";
import type {Comment} from "../../../../entities/comment/model/type.ts";
import {useReplyForm} from "../model/useReplyForm.ts";
import React from "react";

type ReplyFormProps = {
    comment?: Comment;
    setReplyId?: React.Dispatch<React.SetStateAction<number|null>>;
}

export const ReplyForm = ({comment, setReplyId}: ReplyFormProps) => {

    const {replyComment, setReplyComment, handleReply} = useReplyForm();

    return (
        <>
            <textarea className="w-full resize-none border border-gray-300" name="replyComment" id="replyComment" value={replyComment ?? ""} onChange={(e) => setReplyComment(e.target.value)}></textarea>
            <div className="flex justify-end gap-1">
                <InsertButton value={"등록"} type={"button"} onClick={() => handleReply(comment.id)}/>
                <CancleButton value={"취소"} type={"button"} onClick={() => setReplyId(null)}/>
            </div>
        </>
    )
}