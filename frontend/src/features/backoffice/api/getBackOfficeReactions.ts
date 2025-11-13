import {backendUrl} from "../../../shared";

export const getBackOfficeReactions = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/reactions`)
    if (!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}
