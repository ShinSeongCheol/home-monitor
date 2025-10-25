import {deletePost} from "../api/deletePost.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {type Board, getBoard} from "../../../../entities/board";
import {useEffect, useState} from "react";

export const useDeletePostButton = () => {

    const {user, accessToken} = useAuth();
    const {categoryCode, postId} = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState<Board>();

    const handleDelete = async () => {
        if (!confirm('글을 삭제하시겠습니까?')) return;

        try {
            await deletePost(categoryCode, postId, accessToken);
            navigate(-1);
        }catch (err) {
            console.error(err);
        }
    }

    const fetchBoard = async () => {
        try {
            const data = await getBoard(categoryCode)
            setBoard(data);
        }catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        void fetchBoard();
    }, []);

    return {user, board, handleDelete}

}