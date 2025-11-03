import {CommentForm} from "../../../features/comment/create";
import {CommentList} from "../../../entities/comment";
import {ReplyButton, ReplyForm} from "../../../features/comment/reply";
import {UpdateComment} from "../../../features/comment/update";
import {DeleteComment} from "../../../features/comment/delete";
import {CommentReaction} from "../../../features/reaction/ui/CommentReaction.tsx";
import {useAuth} from "../../../shared";

export const Comment = () => {

    const {auth} = useAuth();

    return (
        <section className='w-full lg:w-5xl'>
            <CommentList
                reactions={(comment, fetchData) => <CommentReaction comment={comment} fetchData={fetchData}/>}
                actions={(comment, content, fetchData, toggleIsReply, isEdit, handleIsEdit) =>
                (
                    <>
                        <ReplyButton handleClick={toggleIsReply}/>
                        {comment?.member.email === auth?.email &&
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
                commentForm = {(fetchData) => (auth?.email && <CommentForm fetchData={fetchData}/>)}
            />

        </section>
    )
}