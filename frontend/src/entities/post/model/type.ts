export type Post = {
    title: string;
    content: string;
    view: number;
    createdAt: Date;
    updatedAt: Date;
    member: {
        email: string;
        nickname: string;
    }
}