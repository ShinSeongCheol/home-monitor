import {useEffect, useState} from "react";
import type {Board} from "./type.ts";
import {getBoard} from "../api/getBoard.ts";
import {useParams} from "react-router-dom";

export const useBoard = () => {
    const {categoryCode} = useParams();
    const [board, setBoard] = useState<Board>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchBoard = async () => {
        try {
            const data = await getBoard(categoryCode);
            setBoard(data);
            setIsLoading(false);
        }catch (err) {
            console.error(err);
        }
    }

    // 게시판 데이터 조회
    useEffect(() => {
        void fetchBoard();
    }, []);

    return {isLoading, board};
}