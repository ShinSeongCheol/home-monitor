import {backendUrl} from "../../../../shared";

export const postUserRoleCode = async (body: {code:string|undefined, name:string|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/memberRoleCodes`, {
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
