import type { BoardRole } from "./BoardRole";

export type Board = {
    categoryCode: string;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    posts: {
        id: number;
        title: string | null;
        content: string | null;
        view: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        member: {
            email: string | null;
            nickname: string | null;
        }
    }[];
    boardRoles: BoardRole[];
}