import {backendUrl} from "../../../../shared";

export const postUser = async (body: {email: string|undefined, username:string|undefined, password:string|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/members`, {
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
