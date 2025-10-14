import type { BoardRoleCode } from "./BoardRoleCode";

export type BoardRole = {
    boardRoleCode: BoardRoleCode;
    memberRoleCode: {
        code: string;
        name: string;
    } | null;
}