import {backendUrl} from "../../../../shared";

export const postUserRole = async (body: {memberId: number|undefined, memberRoleCodeId: number|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/memberRoles`, {
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
