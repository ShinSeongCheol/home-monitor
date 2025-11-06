import { PostDetailWidget } from "../../../widgets/post";
import {Comment} from "../../../widgets/comment";

export const PostDetailPage = () => {
    return(
        <section className={'w-full max-w-5xl'}>
            <PostDetailWidget />
            <Comment />
        </section>
    )
}