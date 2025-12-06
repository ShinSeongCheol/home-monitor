import {backendUrl} from "../../../../shared";

export const putUserRole = async (id: number|undefined, body: {memberId:number|undefined, memberRoleCodeId:number|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/memberRoles/${id}`, {
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
