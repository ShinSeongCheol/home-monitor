import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {checkPostAccess} from "../lib/checkPostAccess.ts";
import {type Board} from "../../../../entities/board";
import type {Post} from "../../../../entities/post";

export const usePostAccess = (board: Board|undefined, post?:Post|undefined) => {
    const {user} = useAuth();

    const canRead = user && board ? checkPostAccess(user, board, "READ") : false;
    const canWrite = user && board ? checkPostAccess(user, board, "WRITE") : false;
    const canModify = user && board ? checkPostAccess(user, board,"MODIFY", post ) : false;
    const canDelete = user && board ? checkPostAccess(user, board, "DELETE", post) : false;

    return {canRead, canWrite, canModify, canDelete};

}