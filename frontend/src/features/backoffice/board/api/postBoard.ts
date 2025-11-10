import {backendUrl} from "../../../../shared";

export const postBoard = async (code:string, name:string, comment:string, accessToken:string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/board`, {
        method: 'POST',
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
    if(!res.ok) throw res;
    return await res.json();
}