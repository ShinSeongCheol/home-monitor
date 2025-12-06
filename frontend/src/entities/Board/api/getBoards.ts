import { backendUrl } from "../../../shared";

export const getBoards = async () => {
    const res = await fetch(`${backendUrl}/api/v1/boards`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);

    return await res.json();
}