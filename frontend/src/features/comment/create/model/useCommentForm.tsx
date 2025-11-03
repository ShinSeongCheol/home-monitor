import {type ChangeEvent, type FormEventHandler, useState} from "react";
import {useParams} from "react-router-dom";
import {postComment} from "../api/postComment.ts";
import {useAuth} from "../../../../shared";

export const useCommentForm = (fetchData: () => void) => {

    const {auth} = useAuth();
    const {categoryCode, postId} = useParams();

    const [comment, setComment] = useState("");

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await postComment(categoryCode, postId, auth?.accessToken, comment);
            setComment("");

            fetchData();
        }
        catch(error: any) {
            if (error.status === 401) alert('권한이 없습니다.');
        }
    }

    return {comment, handleChangeComment, handleSubmit};
}