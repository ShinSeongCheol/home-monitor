import type {Auth} from "../model/type.ts";

export const hasAccess = (auth: Auth | null, roles?: string[]) => {
    if (!auth) return false;
    if (!roles) return true;

    const authorities = auth.authorities.map(v => v.authority);

    return roles.some(role => authorities.includes(role));
};