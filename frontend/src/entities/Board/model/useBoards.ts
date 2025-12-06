import {useEffect, useState} from "react";
import type {Board} from "./type.ts";
import {getBoards} from "../api/getBoards.ts";

export const useBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);

    const fetchBoards = async () => {
        try {
            const data = await getBoards();
            setBoards(data);
        }catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        void fetchBoards();
    }, [])

    return {boards}
}