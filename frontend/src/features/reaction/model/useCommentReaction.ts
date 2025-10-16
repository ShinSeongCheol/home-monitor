import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {deleteCommentReactions} from "../api/deleteCommentReactions.ts";
import {postCommentReactions} from "../api/postCommentReactions.ts";
import type {Comment} from "../../../entities/comment/model/type.ts";

export const useCommentReaction = (comment: Comment|undefined, fetchData: () => void) => {

    const { categoryCode, postId } = useParams();
    const {user, accessToken} = useAuth();

    const isReactionExist = comment?.reactions?.some((value) => value?.member.email === user?.email)

    const handleReaction = async () => {
        if (!user?.email) {
            alert('로그인 후 이용 가능합니다.')
            return;
        }

        const commentId = comment?.id;

        try {
            // 반응 삭제
            if (isReactionExist) {
                await deleteCommentReactions(categoryCode, postId, accessToken, commentId);
            //반응 추가
            } else {
                await postCommentReactions(categoryCode, postId, accessToken, commentId);
            }

            fetchData();
        }
        catch (err) {
            console.error(err);
        }
    }

    return { isReactionExist, handleReaction };
}