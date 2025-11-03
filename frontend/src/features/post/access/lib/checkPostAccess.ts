import type {Board} from "../../../../entities/board";
import type {User} from "../../../../contexts/AuthContext.tsx";
import type {Post} from "../../../../entities/post";

export type BoardPermission = "READ" | "WRITE" | "MODIFY" | "DELETE";

export const checkPostAccess = (user: User | null, board: Board, permission: BoardPermission, post?: Post|undefined): boolean => {
    if (!(user && board)) return false;
    const roles = board.boardRoles ?? [];

    if(post && post.member.email !== user.email) {
        return false;
    }

    return roles.some(boardRole => boardRole.boardRoleCode.code === permission && (!boardRole.memberRoleCode?.code || user.authorities.includes(boardRole.memberRoleCode?.code)));
}