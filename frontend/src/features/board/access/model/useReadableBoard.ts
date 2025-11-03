import {useBoards} from "../../../../entities/board";
import {filterReadableBoards} from "../lib/filterReadableBoards.ts";
import {useAuth} from "../../../../shared";

export const useReadableBoard = () => {
    const {auth} = useAuth();
    const {boards} = useBoards();

    const filteredReadableBoards = filterReadableBoards(auth, boards);

    return {filteredReadableBoards};
}