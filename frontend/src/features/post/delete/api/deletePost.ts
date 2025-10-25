import {backendUrl} from "../../../../shared";

export const deletePost = async (categoryCode: string|undefined, postId: string|undefined, accessToken:string|null) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}`,{
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!res.ok) throw new Error(`Http Error ${res.status}`)
}