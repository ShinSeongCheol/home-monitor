import type {Comment} from "../model/type.ts";
import React from "react";

type CommentCardProps = {
    comment: Comment;
    actions: React.ReactNode;
}

export const CommentCard = ({comment, actions}: CommentCardProps) => {
    return (
        <div className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-3'>
            <div className='text-sm text-gray-700 mb-1'>
                <span className='font-bold mr-1 text-gray-800'>{comment?.member.nickname}</span>
                <span className=''>{`${new Date(comment.createdAt).toLocaleString()}`}</span>
            </div>
            {actions}
        </div>
    )
}