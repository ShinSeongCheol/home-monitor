import {CommentForm} from "../../../features/comment/create";
import {useAuth} from "../../../contexts/AuthContext.tsx";
import {CommentList} from "../../../entities/comment";
import {ReplyButton, ReplyForm} from "../../../features/comment/reply";
import {UpdateComment} from "../../../features/comment/update";
import {DeleteComment} from "../../../features/comment/delete";

export const Comment = () => {

    const {user} = useAuth();

    return (
        <section className='w-full lg:w-5xl'>
            <CommentList renderActions={(id, content) =>
                (
                    <div className={"flex justify-end gap-1"}>
                        <ReplyButton id={id} content={content}/>
                        <UpdateComment id={id}/>
                        <DeleteComment id={id}/>
                    </div>
                )
            }/>
            {user?.email && <CommentForm/>}
        </section>
    )
}