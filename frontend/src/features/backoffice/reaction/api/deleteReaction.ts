import {backendUrl} from "../../../../shared";

export const deleteReaction = async (id: number|undefined, accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/reactions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
}