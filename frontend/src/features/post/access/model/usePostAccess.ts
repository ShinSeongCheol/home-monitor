import {checkPostAccess} from "../lib/checkPostAccess.ts";
import {type Board} from "../../../../entities/board";
import {useAuth} from "../../../../shared";
import type {Post} from "../../../../entities/post";

export const usePostAccess = (board: Board|undefined, post?: Post) => {
    const {auth} = useAuth();

    const canRead = board ? checkPostAccess(auth, board, "READ") : false;
    const canWrite = board ? checkPostAccess(auth, board, "WRITE") : false;
    const canModify = board ? checkPostAccess(auth, board,"MODIFY", post) : false;
    const canDelete = board ? checkPostAccess(auth, board, "DELETE", post) : false;

    return {canRead, canWrite, canModify, canDelete};

}