import type {Board} from "../../../../entities/board";
import type {Auth} from "../../../../shared";

export type BoardPermission = "READ" | "WRITE" | "MODIFY" | "DELETE";

export const checkPostAccess = (auth: Auth | null, board: Board, permission: BoardPermission): boolean => {
    if (!auth) return false;
    if (!board) return false;

    const userAuthorities = auth.authorities.map(value => value.authority);

    const roles= userAuthorities.map(userAuthority => {
        const boardRoles = board.boardRoles.map(boardRole => {
            return {
                boardRoleCode: boardRole.boardRoleCode.code,
                memberRoleCode: boardRole.memberRoleCode?.code,
            }
        });

        return boardRoles.filter(boardRole => boardRole.memberRoleCode === userAuthority);
    }).flat();

    return roles.some(value => value.boardRoleCode === permission);
}