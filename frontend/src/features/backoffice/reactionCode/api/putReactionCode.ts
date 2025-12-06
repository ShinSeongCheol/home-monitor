import {backendUrl} from "../../../../shared";

export const putReactionCode = async (id:number|undefined, body: {code:string|undefined, name:string|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/reactionCodes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if(!res.ok) throw res;
    return await res.json();
}