import {backendUrl} from "../../../shared";

export const getBackOfficeComments = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/comments`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}