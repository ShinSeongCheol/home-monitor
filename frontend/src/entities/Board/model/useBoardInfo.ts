import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Board} from "./Board.ts";
import {getBoard} from "../api/getBoard.ts";

export const useBoardInfo = () => {
    const navigate = useNavigate();
    const {categoryCode} = useParams();
    const [board, setBoard] = useState<Board>();

    const fetchBoard = async () => {
        try {
            const data = await getBoard(categoryCode);
            setBoard(data);
        }catch (err) {
            console.error(err);
        }
    }

    // 게시판 데이터 조회
    useEffect(() => {
        void fetchBoard();
    }, []);

    const handleClick = (postId: number) => {
        navigate(`${location.pathname}/${postId}`);
    }

    return {board, handleClick}
}