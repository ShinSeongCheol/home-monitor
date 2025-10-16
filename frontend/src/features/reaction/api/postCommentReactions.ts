import {backendUrl} from "../../../shared";

export const postCommentReactions = async (categoryCode: string|undefined, postId: string|undefined, accessToken: string|null, commentId: number|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/comment/${commentId}/reactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            code: "HEART"
        })
    })

    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}