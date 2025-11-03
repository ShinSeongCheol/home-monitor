import {backendUrl} from "../../../../shared";

export const deleteComment = async (categoryCode: string | undefined, postId: string | undefined, accessToken: string | undefined, id: number | undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/comment/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
}