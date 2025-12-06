import { ReactionButton } from "../../../entities/reaction"
import {useCommentReaction} from "../model/useCommentReaction.ts";
import type {Comment} from "../../../entities/comment/model/type.ts";

type CommentReactionProps = {
    comment: Comment|undefined;
    fetchData: () => void;
}

export const CommentReaction = ({comment, fetchData}: CommentReactionProps) => {

    const {isReactionExist, handleReaction} = useCommentReaction(comment, fetchData);

    return (
        <ReactionButton reactions={comment?.reactions} isReactionExist={isReactionExist} handleReaction={handleReaction} />
    )
}