export const postComment = async (categoryCode: string|undefined, postId: string|undefined, accessToken: string|null, comment: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(
            {
                comment: comment
            }
        )
    })

    if (!res.ok) throw res;

    return await res.json();
}