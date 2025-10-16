import {type ChangeEvent, type FormEventHandler, useState} from "react";
import {postReply} from "../api/postReply.ts";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../contexts/AuthContext.tsx";

type useReplyFormProps = {
    id: number|undefined;
    fetchData: () => void;
    handleCancel: () => void;
}

export const useReplyForm = ({id, fetchData, handleCancel}: useReplyFormProps) => {
    const {accessToken} = useAuth();
    const {categoryCode, postId} = useParams();
    const [replyComment, setReplyComment] = useState("");

    const handleReplyCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReplyComment(e.target.value);
    }

    const handleReplyCommentSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            await postReply(categoryCode, postId, accessToken, id, replyComment)

            fetchData();
            handleCancel();
            setReplyComment("");
        }
        catch(err:any) {
            if (err.status === 401) alert('권한이 없습니다.');
        }
    };

    return {replyComment, handleReplyCommentChange, handleReplyCommentSubmit}
}