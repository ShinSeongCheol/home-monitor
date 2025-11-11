export type BackOfficeBoard = {
    id: number;
    categoryCode: string;
    categoryName: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    posts: {
        id: number;
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    } [];
    boardRole: BackOfficeBoard[];
}

export type BackOfficeBoardRole = {
    id: number;
    board: {
        id: number;
        categoryCode: string;
        categoryName: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    };
    boardRoleCode: {
        id: number;
        code: string;
        name: string;
    };
    memberRoleCode: {
        id: number;
        code: string;
        name: string;
    }
}

export type BackOfficeBoardRoleCode = {
    id: number;
    code: string;
    name: string;
    boardRole: BackOfficeBoardRole[]
}

export type BackOfficePost = {
    id: number;
    member: {
        id: number;
        email: string;
        username: string;
        password: string;
    };
    board: {
        id: number;
        categoryCode: string;
        categoryName: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    };
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    view: number;
    comments: {
        id: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        post: {
            id: number;
            member: {
                id: number;
                email: string;
                username: string;
                password: string;
            };
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        } [];
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        parentComment: string;
        reactions: { id: string }[];
    }
}

export type BackOfficeComment = {
    id: number;
    member: {
        id: number;
        email: string;
        username: string;
        password: string;
    };
    post: {
        id: number;
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    };
    parentComment: {
        id: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        post: {
            id: number;
            member: {
                id: number;
                email: string;
                username: string;
                password: string;
            };
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        };
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        parentComment: string;
        reactions: {
            id: number;
        }[];
    };
    content: string;
    comments: {
        id: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        post: {
            id: number;
            member: {
                id: number;
                email: string;
                username: string;
                password: string;
            };
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        };
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        parentComment: string;
        reactions: {
            id: number;
        }[];
    } [];
    reactions: {
        id: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export type BackOfficeReaction = {
    id: number;
    member: {
        id: number;
        email: string;
        username: string;
        password: string;
    };
    post: {
        id: number;
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    };
    comment: {
        id: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        post: {
            id: number;
            member: {
                id: number;
                email: string;
                username: string;
                password: string;
            };
            title: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        };
        member: {
            id: number;
            email: string;
            username: string;
            password: string;
        };
        parentComment: string;
        reactions: { id: number }[];
    };
    reactionCode: {
        id: number;
        code: string;
        name: string;
    }
}

export type BackOfficeReactionCode = {
    id: number;
    code: string;
    name: string;
}

export type BackOfficeMember = {
    id: number;
    email: string;
    username: string;
    password: string;
}

export type BackOfficeMemberRole = {
    id: number;
    member: {
        id: number;
        email: string;
        username: string;
        password: string;
    };
    memberRoleCode: {
        id: number;
        code: string;
        name: string;
    }
}

export type BackOfficeMemberRoleCode = {
    id: number;
    code: string;
    name: string;
    boardRoles: {
        id: number;
        board: {
            id: number;
            categoryCode: string;
            categoryName: string;
            comment: string;
            createdAt: Date;
            updatedAt: Date;
        };
        boardRoleCode: {
            id: number;
            code: string;
            name: string;
        };
        memberRoleCode: {
            id: number;
            code: string;
            name: string;
        }
    } []
}