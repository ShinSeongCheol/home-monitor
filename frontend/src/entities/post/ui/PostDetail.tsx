import type { Post } from "../model/type";

type PostDetailProps = {
    post: Post | undefined;
    ReactionButton?: React.ReactNode
}

export const PostDetail = ({post, ReactionButton} : PostDetailProps) => {
    return (
        <>
            <h2 className='mt-2 text-lg'>{post?.title}</h2>
            <hr />
            <div className='border border-gray-300 bg-white p-2'>
                <div className="ck-content" dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}></div>
                <div className='flex justify-start items-center gap-2 select-none'>
                    {ReactionButton}
                </div>
            </div>
        </>
    )
}