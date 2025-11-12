import {backendUrl} from "../../../../shared";

export const putComment = async (
    id: number | undefined,
    body: {
        memberId: number | undefined,
        postId: number | undefined,
        parentCommentId: number | undefined | null,
        content: string | undefined
    },
    accessToken: string | undefined
) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`Http Status ${res.status}`);
    return res.json();
}