import {CancleButton, InsertButton} from "../../../../shared/ui";
import {useReplyForm} from "../model/useReplyForm.ts";

type ReplyFormProps = {
    id: number | undefined;
    fetchData: () => void;
    handleCancel: () => void;
}

export const ReplyForm = ({id, fetchData, handleCancel}: ReplyFormProps) => {

    const {replyComment, handleReplyCommentChange, handleReplyCommentSubmit} = useReplyForm({
        id,
        fetchData,
        handleCancel
    });

    return (
        <form onSubmit={handleReplyCommentSubmit}>
            <textarea className="w-full min-h-0 border border-gray-300 mt-3" name="replyComment" id="replyComment"
                    value={replyComment ?? ""} onChange={handleReplyCommentChange}></textarea>
            <div className="flex justify-end gap-1">
                <InsertButton value={"등록"} type={"submit"}/>
                <CancleButton value={"취소"} type={"button"} onClick={handleCancel}/>
            </div>
        </form>
    )
}