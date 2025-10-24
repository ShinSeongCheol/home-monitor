import type { BoardRoleCode } from './BoardRoleCode.ts';

export type BoardRole = {
    boardRoleCode: BoardRoleCode;
    memberRoleCode: {
        code: string;
        name: string;
    } | null;
}