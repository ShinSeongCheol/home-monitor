import {backendUrl} from "../../../shared";

export const getBackOfficeMembers = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/members`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return res.json();
}