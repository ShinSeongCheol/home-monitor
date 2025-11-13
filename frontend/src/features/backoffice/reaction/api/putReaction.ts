export const putReaction = async (
    id: number | undefined,
    body: {
        memberId: number | undefined,
        postId: number | undefined,
        commentId: number | undefined,
        reactionCodeId: number | undefined
    },
    accessToken: string | undefined
) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw res.status;
    return await res.json();
}