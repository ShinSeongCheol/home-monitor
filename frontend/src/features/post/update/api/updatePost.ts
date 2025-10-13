import { backendUrl } from "../../../../shared";

export const updatePost = async (categoryCode:string | undefined, postId:string | undefined, title:string, content:string, accessToken:string | null) => {

    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    })

    if (!res.ok) throw new Error(`Http Error ${res.status}`);

    return await res.json();
}