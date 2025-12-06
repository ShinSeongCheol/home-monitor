export type Comment = {
    id: number;
    content: string;
    member: {
        email: string;
        nickname: string;
    },
    createdAt: Date;
    updatedAt: Date;
    children_comment: Comment[],
    reactions: {
        member: {
            email: string;
            nickname: string;
        },
        reactionCode: {
            code: string;
            name: string;
        }
    }[],
}