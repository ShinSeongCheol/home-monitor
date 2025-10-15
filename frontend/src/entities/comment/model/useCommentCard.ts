import {useState} from "react";
import type {Comment} from "./type.ts";

export const useCommentCard = () => {

    const [comment, setComment] = useState<Comment>();

    return {comment};

}