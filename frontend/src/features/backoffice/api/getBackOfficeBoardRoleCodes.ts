import {backendUrl} from "../../../shared";

export const getBackOfficeBoardRoleCodes = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/boardRoleCodes`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}