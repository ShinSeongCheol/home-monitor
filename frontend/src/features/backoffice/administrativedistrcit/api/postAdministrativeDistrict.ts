import {backendUrl} from "../../../../shared";
import type {AdministarativeDistrict} from "../model/type.ts";

export const postAdministrativeDistrict = async (body: AdministarativeDistrict[], accessToken:string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/forecast/administrativeDistrict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw Error(`Http Error ${res.status}`);
}