import type {Comment} from "../model/type.ts";
import React from "react";
import {useCommentCard} from "../model/useCommentCard.ts";

type CommentCardProps = {
    comment: Comment|undefined;
    fetchData: () => void;
    reactions?: (comment: Comment|undefined, fetchData: () => void) => React.ReactNode;
    actions?: (comment: Comment|undefined, content: string, fetchData: () => void, toggleIsReply: () => void, isEdit:boolean, handleIsEdit: (isEdit:boolean) => void) => React.ReactNode;
    replyForm?: (id: number|undefined, fetchData: () => void, handleIsReply: (isReply: boolean) => void) => React.ReactNode;
}

export const CommentCard = ({comment, fetchData, reactions, actions, replyForm}: CommentCardProps) => {

    const {content, handleContentChange, isReply, toggleIsReply, handleIsReply, isEdit, handleIsEdit} = useCommentCard(comment);

    return (
        <div className='text-sm text-gray-700 bg-white border border-gray-200 rounded-lg my-2 p-2'>
            <div className='text-sm text-gray-700 mb-1'>
                <span className='font-bold mr-1 text-gray-800'>{comment?.member.nickname}</span>
                <span className=''>{`${new Date(comment?.createdAt ?? "").toLocaleString()}`}</span>
            </div>

            <textarea className="w-full read-only:border-none border border-gray-300" disabled={!isEdit} value={content ?? ""} onChange={handleContentChange}></textarea>

            <div className={"flex justify-between"}>
                {reactions?.(comment, fetchData)}
                <div className={"flex justify-end gap-1"}>
                    {actions?.(comment, content, fetchData, toggleIsReply, isEdit, handleIsEdit)}
                </div>
            </div>

            {isReply && replyForm?.(comment?.id, fetchData, handleIsReply)}

            {
                comment?.children_comment && comment?.children_comment.length > 0 && (
                    comment?.children_comment.map((children_comment) => {
                        return (
                            <CommentCard key={children_comment.id} comment={children_comment} fetchData={fetchData} reactions={reactions} actions={actions} replyForm={replyForm} />
                        )
                    })
                )
            }
        </div>
    )
}