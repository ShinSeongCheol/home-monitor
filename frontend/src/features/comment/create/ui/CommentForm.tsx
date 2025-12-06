import {InsertButton} from "../../../../shared/ui";
import {useCommentForm} from "../model/useCommentForm.tsx";

type CommentFormProps = {
    fetchData: () => void;
}

export const CommentForm = ({fetchData}: CommentFormProps) => {

    const {comment, handleChangeComment, handleSubmit} = useCommentForm(fetchData);

    return (
        <form className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-2' onSubmit={handleSubmit}>
            <div className='text-base mb-2'>
                <textarea className="w-full border border-gray-300" id="comment" name="comment" value={comment} onChange={handleChangeComment}></textarea>
                <div className='flex justify-end gap-2'>
                    <InsertButton value={"등록"} type={"submit"}/>
                </div>
            </div>
        </form>
    )
}