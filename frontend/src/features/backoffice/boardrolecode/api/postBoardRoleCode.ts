import {backendUrl} from "../../../../shared";

export const postBoardRoleCode = async (body: {code: string|undefined, name:string|undefined}, accessToken:string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/boardRoleCodes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    });
    if(!res.ok) throw Error(`Http Error ${res.status}`);
    return await res.json();
}