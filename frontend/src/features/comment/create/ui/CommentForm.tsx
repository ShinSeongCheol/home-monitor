import {InsertButton} from "../../../../shared/ui";
import {useCommentForm} from "../model/useCommentForm.tsx";

export const CommentForm = () => {

    const {comment, setComment, handleSubmit} = useCommentForm();

    return (
        <form className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-2' onSubmit={handleSubmit}>
            <div className='text-base mb-2'>
                <textarea className="w-full border border-gray-300 resize-none" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <div className='flex justify-end gap-2'>
                    <InsertButton value={"등록"} type={"submit"}/>
                </div>
            </div>
        </form>
    )
}