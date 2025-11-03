import type {Board} from "../../../../entities/board";
import type {Auth} from "../../../../shared";

export const filterReadableBoards = (auth: Auth|null, boards: Board[]) => {
    if (!auth) return [];

    return boards.filter(board => board.boardRoles.some(role => role.boardRoleCode.code === "READ" && (!role.memberRoleCode?.code || auth?.authorities.includes({authority: role.memberRoleCode?.code}))));
}