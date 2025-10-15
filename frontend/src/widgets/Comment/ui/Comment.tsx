import {CommentForm} from "../../../features/comment/create";
import {useAuth} from "../../../contexts/AuthContext.tsx";
import {CommentList, useCommentList} from "../../../entities/comment";
import {Reply} from "../../../features/comment/reply";
import {UpdateComment} from "../../../features/comment/update";
import {DeleteComment} from "../../../features/comment/delete";

export const Comment = () => {

    const {user} = useAuth();

    return (
        <section className='w-full lg:w-5xl'>
            <CommentList renderActions={(id) =>
                (
                    <>
                        <Reply id={id}/>
                        <UpdateComment id={id}/>
                        <DeleteComment id={id}/>
                    </>
                )
            }/>
            {user?.email && <CommentForm/>}
        </section>
    )
}