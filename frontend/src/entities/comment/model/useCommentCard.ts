import {useEffect, useState} from "react";
import type {Comment} from "./type.ts";

export const useCommentCard = (comment: Comment | undefined) => {

    const [content, setContent] = useState<string>("");

    useEffect(() => {
        setContent(comment?.content ?? "");
    }, [comment]);

    return {content, setContent};

}