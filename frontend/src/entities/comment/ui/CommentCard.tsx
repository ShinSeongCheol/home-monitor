import type {Comment} from "../model/type.ts";
import React from "react";
import {useCommentCard} from "../model/useCommentCard.ts";

type CommentCardProps = {
    comment: Comment|undefined;
    actions?: (id: number|undefined, content: string) => React.ReactNode;
}

export const CommentCard = ({comment, actions}: CommentCardProps) => {

    const {content, setContent} = useCommentCard(comment);

    return (
        <div className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg mb-2 p-3'>
            <div className='text-sm text-gray-700 mb-1'>
                <span className='font-bold mr-1 text-gray-800'>{comment?.member.nickname}</span>
                <span className=''>{`${new Date(comment?.createdAt ?? "").toLocaleString()}`}</span>
            </div>

            <textarea className="w-full resize-none read-only:border-none border border-gray-300" disabled={true} id="comment" name="comment" value={content ?? ""} onChange={(e) => setContent(e.target.value)}></textarea>

            {actions?.(comment?.id, content)}
        </div>
    )
}