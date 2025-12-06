import {backendUrl} from "../../../../shared";

export const postBoardRole = async (body: {boardId: number|undefined, boardRoleCodeId: number|undefined, memberRoleCodeId: number|undefined}, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/boardRole`, {
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