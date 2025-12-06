import {backendUrl} from "../../../shared";

export const getBackOfficeReactionCodes = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/reactionCodes`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}