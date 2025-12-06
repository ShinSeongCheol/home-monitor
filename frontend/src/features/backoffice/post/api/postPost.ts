import {backendUrl} from "../../../../shared";

export const postPost = async (body: {
    boardId: number | undefined,
    memberId: number | undefined,
    title: string | undefined,
    content: string | undefined
}, accessToken: string | undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}