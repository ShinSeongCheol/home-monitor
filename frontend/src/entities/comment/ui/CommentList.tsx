import { useCommentList } from "../model/useCommentList";
import {CommentCard} from "./CommentCard.tsx";
import type {Comment} from "../model/type.ts";
import React from "react";

type CommentListProps = {
    renderActions?: (commentId: number) => React.ReactNode;
}

export const CommentList = ({renderActions}: CommentListProps) => {

    const {comments, sortedComments, countAllChildren} = useCommentList();

    return(
        <>
            <h2 className="text-base p-1 m-2 border-b border-b-gray-400" >전체 댓글 <span className="text-red-500">{countAllChildren(comments ?? [])}</span>개</h2>
            {
                sortedComments?.map((comment: Comment) => (
                    <CommentCard key={comment.id} comment={comment} actions={renderActions?.(comment.id)} />
                ))
            }
        </>
    )
}