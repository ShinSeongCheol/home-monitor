import { useAuth } from "../../../contexts/AuthContext";
import { InsertButton, EditButton, DeleteButton, CancleButton } from "../../../shared/ui";
import type { Comment } from "../model/type"
import { useCommentItem } from "../model/useCommentItem";

type CommentItemProps = {
    comment: Comment;
    ReactionButton?: React.ReactNode;
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;
    handleReply: (id: number) => void;
}

export const CommentItem = ({ comment, ReactionButton, handleUpdate, handleDelete, handleReply }: CommentItemProps) => {

    const {user} = useAuth();
    const {editCommentId, setEditCommentId, editComment, setEditComment, replyId, setReplyId, replyComment, setReplyComment} = useCommentItem();

    return (
        <div className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-3'>
            <div className='text-sm text-gray-700 mb-1 {styles.meta}'>
                <span className='font-bold mr-1 text-gray-800 {styles.author}'>{comment.member.nickname}</span>
                <span className=''>{`${new Date(comment.createdAt).toLocaleString()}`}</span>
            </div>

            <div className='text-base mb-2'>
                {
                    comment.id === editCommentId
                        ?
                        <textarea className="border border-gray-300" name="comment" id="comment" value={editComment ?? ""} onChange={(e) => setEditComment(e.target.value)}></textarea>
                        :
                        <p>{comment.content}</p>
                }


                <div className="flex justify-between mt-4">
                    {ReactionButton}

                    <div className="flex justify-end gap-1">
                        {user?.email &&
                            <InsertButton value={"답글"} type={"button"} onClick={() => setReplyId(comment.id)}/>
                        }
                        {
                            comment.member.email === user?.email &&
                            <>
                                <EditButton value={"수정"} type={"button"} onClick={() => {
                                    if (comment.id === editCommentId) {
                                        handleUpdate(comment.id);
                                    } else {
                                        setEditCommentId(comment.id);
                                        setEditComment(comment.content);
                                    }
                                }}/>

                                <DeleteButton value={"삭제"} type={"button"} onClick={() => setReplyId(comment.id)}/>
                            </>
                        }
                    </div>
                </div>


                {replyId === comment.id &&
                    (
                        <div className="">
                            <textarea className="border border-gray-300" name="replyComment" id="replyComment" value={replyComment ?? ""} onChange={(e) => setReplyComment(e.target.value)}></textarea>
                            <div className="flex justify-end gap-1">
                                <InsertButton value={"등록"} type={"button"} onClick={() => handleReply(comment.id)}/>
                                <CancleButton value={"취소"} type={"button"} onClick={() => setReplyId(null)} />
                            </div>
                        </div>
                    )
                }

                {
                    comment.children_comment && comment.children_comment.length > 0 && (
                        comment.children_comment.map((children_comment) => {
                            return (
                                <div className="ml-4 mt-4">
                                    <CommentItem key={children_comment.id} comment={children_comment} ReactionButton={ReactionButton} handleDelete={handleDelete} handleUpdate={handleUpdate} handleReply={handleReply}/>
                                </div>
                            )
                        })
                    )
                }
            </div>

        </div>
    )
}