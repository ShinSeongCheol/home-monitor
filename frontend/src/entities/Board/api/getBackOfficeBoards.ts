import { backendUrl } from "../../../shared";

export const getBackOfficeBoards = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/boards`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);

    return await res.json();
}