import { backendUrl } from "../../../shared";

export const getBoard = async (categoryCode: string | undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/boards/${categoryCode}`)
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}