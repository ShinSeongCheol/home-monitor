import {type FormEventHandler, useState} from "react";
import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {useParams} from "react-router-dom";
import {postComment} from "../api/postComment.ts";
import {useCommentList} from "../../../../entities/comment/model/useCommentList.ts";

export const useCommentForm = () => {

    const {accessToken} = useAuth();
    const {categoryCode, postId} = useParams();

    const [comment, setComment] = useState("");

    const {fetchData} = useCommentList();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await postComment(categoryCode, postId, accessToken, comment);
            setComment("");
            alert('댓글이 등록되었습니다!');
            await fetchData();
        }
        catch(error: any) {
            if (error.status === 401) alert('권한이 없습니다.');
        }
    }

    return {comment, setComment, handleSubmit};
}