import {type ChangeEvent, useEffect, useState} from "react";
import type {Comment} from "./type.ts";

export const useCommentCard = (comment: Comment | undefined) => {

    const [content, setContent] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isReply, setIsReply] = useState<boolean>(false);

    const handleContentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const toggleIsReply = () => {
        setIsReply(!isReply);
    }

    const handleIsReply = (isReply: boolean) => {
        setIsReply(isReply)
    }

    const handleIsEdit = (isEdit:boolean) => {
        setIsEdit(isEdit);
    }

    useEffect(() => {
        setContent(comment?.content ?? "");
    }, [comment]);

    return {content, handleContentChange, isReply, toggleIsReply, handleIsReply, isEdit, handleIsEdit};

}