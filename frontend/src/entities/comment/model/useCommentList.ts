import { useEffect, useState } from "react";
import type { Comment } from "./type";
import { getComments } from "../api/getComments";
import { useParams } from "react-router-dom";

export const useCommentList = () => {

    const {categoryCode, postId} = useParams();
    const [comments, setComments] = useState<Comment[]>();

    const fetchData = async () => {
        try {
            const data = await getComments(categoryCode, postId);
            setComments(data);
        }
        catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const sortedComments = comments?.sort((a, b) => a.id - b.id);

    function countAllChildren(comments: Comment[]): number {
        return comments.reduce((acc, comment) => {
            return acc + 1 + countAllChildren(comment.children_comment ?? []);
        }, 0);
    }

    return {comments, fetchData, sortedComments, countAllChildren};
}