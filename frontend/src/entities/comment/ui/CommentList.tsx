import { useAuth } from "../../../contexts/AuthContext"
import { InsertButton } from "../../../shared/ui";
import { useCommentList } from "../model/useCommentList";
import { CommentItem } from "./CommentItem";

type CommentListProps = {
    ReactionButton?: React.ReactNode;
    handleSubmit: () => void;
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;
    handleReply: (id: number) => void;
}

export const CommentList = ({handleSubmit, handleDelete, handleReply, handleUpdate, ReactionButton}: CommentListProps) => {

    const {user} = useAuth();
    const {comment, setComment, comments, countAllChildren} = useCommentList();

    return(
        <section className='w-full lg:w-5xl'>
            <h2 className="text-base p-1 m-2 border-b border-b-gray-400" >전체 댓글 <span className="text-red-500">{countAllChildren(comments ?? [])}</span>개</h2>
            {
                comments?.sort((a, b) => a.id - b.id).map((comment) => (
                    <CommentItem key={comment.id} comment={comment} ReactionButton={ReactionButton} handleDelete={handleDelete} handleUpdate={handleUpdate} handleReply={handleReply}/>
                ))
            }

            {user?.email && 
                <form className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-2' onSubmit={handleSubmit}>
                    <div className='text-base mb-2'>
                        <textarea className="border border-gray-300" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <div className='flex justify-end gap-2'>
                            <InsertButton value={"등록"} type={"submit"}/>
                        </div>
                    </div>
                </form>
            }
        </section>
    )
}