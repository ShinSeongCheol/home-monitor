import type {Board} from "../../../../entities/board";
import type {Auth} from "../../../../shared";

export const filterReadableBoards = (auth: Auth|null, boards: Board[]) => {
    if (!auth) return [];

    const userAuthority = auth.authorities.map(authority => authority.authority);

    const filteredBoard = boards.filter(board => board.boardRoles.some(boardRole => {
        if (!userAuthority.includes(boardRole.memberRoleCode?.code ?? "")) return false;
        if (boardRole.boardRoleCode.code !== "READ") return false;

        return true;
    }));

    return filteredBoard;
}