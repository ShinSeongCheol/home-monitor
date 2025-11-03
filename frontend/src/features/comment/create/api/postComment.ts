import {backendUrl} from "../../../../shared";

export const postComment = async (categoryCode: string | undefined, postId: string | undefined, accessToken: string | undefined, comment: string) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/comment`, {
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