import {useCommentList} from "../model/useCommentList";
import {CommentCard} from "./CommentCard.tsx";
import type {Comment} from "../model/type.ts";
import React from "react";

type CommentListProps = {
    reactions?: (comment: Comment|undefined, fetchData: () => void) => React.ReactNode;
    actions?: (comment: Comment|undefined, content: string, fetchData: () => void, toggleIsReply: () => void, isEdit:boolean, handleIsEdit: (isEdit:boolean) => void) => React.ReactNode;
    replyForm?: (id: number|undefined, fetchData: () => void, handleIsReply: (isReply: boolean) => void) => React.ReactNode;
    commentForm?: (fetchData: () => void) => React.ReactNode;
}

export const CommentList = ({reactions, actions, replyForm, commentForm}: CommentListProps) => {

    const {comments, fetchData, sortedComments, countAllChildren} = useCommentList();

    return (
        <>
            <h2 className="text-base p-1 m-2 border-b border-b-gray-400">전체 댓글 <span className="text-red-500">{countAllChildren(comments ?? [])}</span>개</h2>
            {
                sortedComments?.map((sortedComment: Comment) => (
                        <CommentCard key={sortedComment.id} comment={sortedComment} fetchData={fetchData} reactions={reactions} actions={actions} replyForm={replyForm}/>
                    )
                )
            }

            {commentForm?.(fetchData)}
        </>
    )
}