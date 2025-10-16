import {backendUrl} from "../../../../shared";

export const updateComment = async (categoryCode: string | undefined, postId: string | undefined, accessToken: string | null, id: number | undefined, comment: string) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/comment/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            comment: comment
        })
    })

    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();

}