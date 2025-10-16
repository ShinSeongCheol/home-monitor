import type { Post } from "../model/type";
import React from "react";

type PostDetailProps = {
    post: Post | undefined;
    postReaction?: React.ReactNode
}

export const PostDetail = ({post, postReaction} : PostDetailProps) => {
    return (
        <>
            <h2 className='mt-2 text-lg'>{post?.title}</h2>
            <hr />
            <div className='border border-gray-300 bg-white p-2'>
                <div className="ck-content" dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}></div>
                <div className='flex justify-start items-center gap-2 select-none'>
                    {postReaction}
                </div>
            </div>
        </>
    )
}