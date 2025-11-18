import type {Board} from "../../../../entities/board";
import type {Auth} from "../../../../shared";

export const filterReadableBoards = (auth: Auth|null, boards: Board[]) => {

    const userAuthority = auth?.authorities.map(authority => authority.authority);

    return boards.filter(board => board.boardRoles.some(boardRole => {
        if (boardRole.memberRoleCode === null) return true;
        if (!userAuthority?.includes(boardRole.memberRoleCode.code ?? "")) return false;
        if (boardRole.boardRoleCode.code === "READ") return true;
    }));
}