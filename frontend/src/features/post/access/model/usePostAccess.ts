import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {checkPostAccess} from "../lib/checkPostAccess.ts";
import {type Board} from "../../../../entities/board";

export const usePostAccess = (board: Board|undefined) => {
    const {user} = useAuth();

    const canRead = user && board ? checkPostAccess(user, board, "READ") : false;
    const canWrite = user && board ? checkPostAccess(user, board, "WRITE") : false;
    const canModify = user && board ? checkPostAccess(user, board, "MODIFY") : false;
    const canDelete = user && board ? checkPostAccess(user, board, "DELETE"): false;

    return {canRead, canWrite, canModify, canDelete};

}