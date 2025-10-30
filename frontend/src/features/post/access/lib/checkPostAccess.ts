import type {Board} from "../../../../entities/board";
import type {User} from "../../../../contexts/AuthContext.tsx";

export type BoardPermission = "READ" | "WRITE" | "MODIFY" | "DELETE";

export const checkPostAccess = (user: User | null, board: Board, permission: BoardPermission): boolean => {
    if (!(user && board)) return false;
    const roles = board.boardRoles ?? [];

    return roles.some(boardRole => boardRole.boardRoleCode.code === permission && (!boardRole.memberRoleCode?.code || user.authorities.includes(boardRole.memberRoleCode?.code)));
}