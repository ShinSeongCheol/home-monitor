import {backendUrl} from "../../../shared";

export const getBackOfficeMemberRoleCodes = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/memberRoleCodes`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}