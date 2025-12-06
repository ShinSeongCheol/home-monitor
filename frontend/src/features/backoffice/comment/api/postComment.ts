import {backendUrl} from "../../../../shared";

export const postComment = async (
    body: {
        memberId: number | undefined,
        postId: number | undefined,
        parentCommentId: number | undefined,
        content: string | undefined
    },
    accessToken: string | undefined
) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}