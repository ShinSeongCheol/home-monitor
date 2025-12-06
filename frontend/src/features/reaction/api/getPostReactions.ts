import { backendUrl } from "../../../shared";

export const getPostReactions = async (categoryCode: string|undefined, postId: string|undefined) => {
    const res = await fetch((`${backendUrl}/api/v1/boards/${categoryCode}/${postId}/reactions`), {
        headers: {
            'Content-type': 'application/json'
        }
    })

    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}