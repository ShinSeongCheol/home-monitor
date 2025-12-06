import {backendUrl} from "../../../shared";

export const getBackOfficeBoardRoles = async () => {
   const res = await fetch(`${backendUrl}/api/v1/backoffice/boardRoles`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}