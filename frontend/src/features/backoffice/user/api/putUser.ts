import {backendUrl} from "../../../../shared";

export const putUser = async (id: number|undefined, body: {email: string|undefined, username:string|undefined, password:string|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/members/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw res;
    return await res.json();
}
