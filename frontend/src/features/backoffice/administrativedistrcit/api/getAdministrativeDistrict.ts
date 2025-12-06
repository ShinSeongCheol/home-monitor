import {backendUrl} from "../../../../shared";

export const getAdministrativeDistrict = async (accessToken: string|undefined) => {
    const res = await fetch(`${backendUrl}/api/v1/forecast/administrativeDistrict`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    return await res.json();
}