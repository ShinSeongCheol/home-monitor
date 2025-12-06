import { backendUrl } from "../../../shared";

export const deleteReaction = async (categoryCode: string | undefined, postId: string | undefined, accessToken: string | null) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/reactions`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            code: "HEART"
        })
    })
    
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
}