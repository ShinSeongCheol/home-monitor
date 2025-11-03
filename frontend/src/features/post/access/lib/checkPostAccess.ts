import type {Board} from "../../../../entities/board";
import type {Post} from "../../../../entities/post";
import type {Auth} from "../../../../shared";

export type BoardPermission = "READ" | "WRITE" | "MODIFY" | "DELETE";

export const checkPostAccess = (auth: Auth | null, board: Board, permission: BoardPermission, post?: Post | undefined): boolean => {
    if (!(auth && board)) return false;
    const roles = board.boardRoles ?? [];

    if (post && post.member.email !== auth.email) {
        return false;
    }

    return roles.some(boardRole => boardRole.boardRoleCode.code === permission && (!boardRole.memberRoleCode?.code || auth.authorities.includes({authority: boardRole.memberRoleCode?.code})));
}