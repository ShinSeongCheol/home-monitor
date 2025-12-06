import { useParams } from "react-router-dom";
import {deleteCommentReactions} from "../api/deleteCommentReactions.ts";
import {postCommentReactions} from "../api/postCommentReactions.ts";
import type {Comment} from "../../../entities/comment/model/type.ts";
import {useAuth} from "../../../shared";

export const useCommentReaction = (comment: Comment|undefined, fetchData: () => void) => {

    const { categoryCode, postId } = useParams();
    const {auth} = useAuth();

    const isReactionExist = comment?.reactions?.some((value) => value?.member.email === auth?.email)

    const handleReaction = async () => {
        if (!auth?.email) {
            alert('로그인 후 이용 가능합니다.')
            return;
        }

        const commentId = comment?.id;

        try {
            // 반응 삭제
            if (isReactionExist) {
                await deleteCommentReactions(categoryCode, postId, auth.accessToken, commentId);
            //반응 추가
            } else {
                await postCommentReactions(categoryCode, postId, auth.accessToken, commentId);
            }

            fetchData();
        }
        catch (err) {
            console.error(err);
        }
    }

    return { isReactionExist, handleReaction };
}