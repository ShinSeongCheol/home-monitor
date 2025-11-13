import {backendUrl} from "../../../shared";

export const getBackOfficeUserRoles = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/memberRoles`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}