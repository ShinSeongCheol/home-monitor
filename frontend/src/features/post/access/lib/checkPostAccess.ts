import type {Board} from "../../../../entities/board";
import type {Auth} from "../../../../shared";
import type {Post} from "../../../../entities/post";

export type BoardPermission = "READ" | "WRITE" | "MODIFY" | "DELETE";

export const checkPostAccess = (auth: Auth | null, board: Board, permission: BoardPermission, post?: Post): boolean => {
    if (!board) return false;

    const userAuthorities = auth?.authorities.map(value => value.authority);

    const hasAccess = board.boardRoles.some(boardRole => {
        if (boardRole.memberRoleCode === null && boardRole.boardRoleCode.code === permission) return true;
        if (userAuthorities?.includes(boardRole.memberRoleCode?.code ?? "") && boardRole.boardRoleCode.code === permission) return true;
    });

    if (post) {
        return hasAccess && (post.member.email === auth?.email);
    }else {
        return hasAccess;
    }
}