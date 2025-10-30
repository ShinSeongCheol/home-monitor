import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {useBoards} from "../../../../entities/board";
import {filterReadableBoards} from "../lib/filterReadableBoards.ts";

export const useReadableBoard = () => {
    const {user} = useAuth();
    const {boards} = useBoards();

    const filteredReadableBoards = filterReadableBoards(user, boards);

    return {filteredReadableBoards};
}