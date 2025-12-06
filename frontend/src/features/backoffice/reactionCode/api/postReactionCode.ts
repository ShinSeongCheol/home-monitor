import {backendUrl} from "../../../../shared";

export const postReactionCode = async (body: {code: string|undefined, name: string|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/reactionCodes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if(!res.ok) throw res;
    return await res.json();
}