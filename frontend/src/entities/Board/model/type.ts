export type Board = {
    id: number;
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

export type BoardRole = {
    boardRoleCode: BoardRoleCode;
    memberRoleCode: {
        code: string;
        name: string;
    } | null;
}

export type BoardRoleCode = {
    code: string;
    name: string;
}