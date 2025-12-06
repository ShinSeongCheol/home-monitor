import {backendUrl} from "../../../../shared";

export const postReaction = async (
    body: {
        memberId: number | undefined,
        postId: number | undefined,
        commentId: number | undefined,
        reactionCodeId: number | undefined
    },
    accessToken: string|undefined
    ) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/reactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw res.status;
    return await res.json();
}