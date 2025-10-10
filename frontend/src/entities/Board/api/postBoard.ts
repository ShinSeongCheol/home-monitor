import { backendUrl } from "../../../shared";

export const postBoard = async (categoryCode: string | undefined, accessToken: string | null, data: object) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}/post`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        }
    )
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}