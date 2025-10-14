import { useEffect, useState } from "react";
import type { Reaction } from "./type";
import { getReactions } from "../api/getReactions";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const useReactionButton = () => {

    const { categoryCode, postId } = useParams();
    const {user} = useAuth();

    const [reactions, setReactions] = useState<Reaction[]>([]);
    const isReactionExist = reactions?.some((value) => value?.member.email === user?.email)

    const fetchData = async () => {
        try {
            const reactions = await getReactions(categoryCode, postId)
            setReactions(reactions);
        }
        catch(err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [reactions]);

    return {reactions, isReactionExist, fetchData};
}