import {backendUrl} from "../../../../shared";

export const postReply = async (categoryCode: string | undefined, postId: string | undefined, accessToken: string | undefined, commentId: number | undefined, comment: string) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/comment/${commentId}/reply`, {
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