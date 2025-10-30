import type {User} from "../../../../contexts/AuthContext.tsx";
import type {Board} from "../../../../entities/board";

export const filterReadableBoards = (user: User|null, boards: Board[]) => {
    if (!user) return [];

    return boards.filter(board => board.boardRoles.some(role => role.boardRoleCode.code === "READ" && (!role.memberRoleCode?.code || user?.authorities.includes(role.memberRoleCode?.code))));
}