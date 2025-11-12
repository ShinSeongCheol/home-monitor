import {backendUrl} from "../../../../shared";

export const updateBoardRole = async (id: number|undefined, body: {boardId: number |undefined, boardRoleCodeId: number|undefined, memberRoleCodeId: number|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/boardRole/${id}`, {
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