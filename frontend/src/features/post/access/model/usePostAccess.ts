import {checkPostAccess} from "../lib/checkPostAccess.ts";
import {type Board} from "../../../../entities/board";
import type {Post} from "../../../../entities/post";
import {useAuth} from "../../../../shared";

export const usePostAccess = (board: Board|undefined, post?:Post|undefined) => {
    const {auth} = useAuth();

    const canRead = auth && board ? checkPostAccess(auth, board, "READ") : false;
    const canWrite = auth && board ? checkPostAccess(auth, board, "WRITE") : false;
    const canModify = auth && board && post ? checkPostAccess(auth, board,"MODIFY", post ) : false;
    const canDelete = auth && board && post ? checkPostAccess(auth, board, "DELETE", post) : false;

    return {canRead, canWrite, canModify, canDelete};

}