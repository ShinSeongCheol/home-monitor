import {CommentForm} from "../../../features/comment/create";
import {useAuth} from "../../../contexts/AuthContext.tsx";
import {CommentList} from "../../../entities/comment";
import {ReplyButton, ReplyForm} from "../../../features/comment/reply";
import {UpdateComment} from "../../../features/comment/update";
import {DeleteComment} from "../../../features/comment/delete";
import {CommentReaction} from "../../../features/reaction/ui/CommentReaction.tsx";

export const Comment = () => {

    const {user} = useAuth();

    return (
        <section className='w-full lg:w-5xl'>
            <CommentList
                reactions={(comment, fetchData) => <CommentReaction comment={comment} fetchData={fetchData}/>}
                actions={(comment, content, fetchData, toggleIsReply, isEdit, handleIsEdit) =>
                (
                    <>
                        <ReplyButton handleClick={toggleIsReply}/>
                        {comment?.member.email === user?.email &&
                            <>
                                <UpdateComment id={comment?.id} content={content} fetchData={fetchData} isEdit={isEdit} handleIsEdit={handleIsEdit}/>
                                <DeleteComment id={comment?.id} fetchData={fetchData}/>
                            </>
                        }
                    </>
                )
            }

                replyForm={(id, fetchData, handleIsReply) => (
                    <ReplyForm id={id} fetchData={fetchData} handleCancel={() => handleIsReply(false)}/>
                )
            }
                commentForm = {(fetchData) => (user?.email && <CommentForm fetchData={fetchData}/>)}
            />

        </section>
    )
}