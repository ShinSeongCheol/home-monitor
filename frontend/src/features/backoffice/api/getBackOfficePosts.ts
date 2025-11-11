import {backendUrl} from "../../../shared";

export const getBackOfficePosts = async () => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/posts`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return res.json();
}