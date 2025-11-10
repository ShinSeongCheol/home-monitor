import {backendUrl} from "../../../../shared";

export const updateBoard = async (id: string, code: string, name:string, comment:string, accessToken:string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/board/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            code: code,
            name: name,
            comment: comment,
        })
    })
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
}