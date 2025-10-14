import { useParams } from "react-router-dom";
import { deleteReaction } from "../api/deleteReaction";
import { postReaction } from "../api/postReaction";
import { useAuth } from "../../../contexts/AuthContext";
import type { Reaction } from "../../../entities/reaction/model/type";
import { useEffect, useState } from "react";
import { getPostReactions } from "../api/getPostReactions";

export const usePostReactionFeature = () => {

    const { categoryCode, postId } = useParams();
    const {user, accessToken} = useAuth();

    const [reactions, setReactions] = useState<Reaction[]>([]);
    const isReactionExist = reactions?.some((value) => value?.member.email === user?.email)

    const fetchData = async () => {
        try {
            const reactions = await getPostReactions(categoryCode, postId)
            setReactions(reactions);
        }
        catch(err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

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

    return { reactions, isReactionExist, handleReaction };
}