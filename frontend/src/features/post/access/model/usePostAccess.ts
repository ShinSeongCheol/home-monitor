import {checkPostAccess} from "../lib/checkPostAccess.ts";
import {type Board} from "../../../../entities/board";
import {useAuth} from "../../../../shared";

export const usePostAccess = (board: Board|undefined) => {
    const {auth} = useAuth();

    const canRead = auth && board ? checkPostAccess(auth, board, "READ") : false;
    const canWrite = auth && board ? checkPostAccess(auth, board, "WRITE") : false;
    const canModify = auth && board ? checkPostAccess(auth, board,"MODIFY" ) : false;
    const canDelete = auth && board ? checkPostAccess(auth, board, "DELETE") : false;

    return {canRead, canWrite, canModify, canDelete};

}