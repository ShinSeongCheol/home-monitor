import { useParams } from "react-router-dom";
import { deleteReaction } from "../api/deleteReaction";
import { postReaction } from "../api/postReaction";
import { useAuth } from "../../../contexts/AuthContext";
import { useReactionButton } from "../../../entities/reaction";

export const useReactionFeature = () => {

    const { categoryCode, postId } = useParams();
    const {user, accessToken} = useAuth();
    const {isReactionExist, fetchData} = useReactionButton();

    const handleReaction = async () => {
        if (!user?.email) {
            alert('로그인 후 이용 가능합니다.')
            return;
        }

        try {
            // 반응 삭제
            if (isReactionExist) {
                await deleteReaction(categoryCode, postId, accessToken);
            //반응 추가
            } else {
                await postReaction(categoryCode, postId, accessToken);
            }

            fetchData();
        }
        catch (err) {
            console.error(err);
        }
    }

    return { handleReaction };
}