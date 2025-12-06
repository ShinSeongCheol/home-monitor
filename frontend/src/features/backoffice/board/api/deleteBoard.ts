import {backendUrl} from "../../../../shared";

export const deleteBoard = async (id: string, accessToken: string | undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/board/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (!res.ok) throw new Error(`Http Error ${res.status}`);
}