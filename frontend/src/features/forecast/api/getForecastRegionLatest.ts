import { backendUrl } from "../../../shared";


export const getForecastRegionLatest = async () => {
    const res = await fetch(`${backendUrl}/api/v1/forecast/region/latest`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}