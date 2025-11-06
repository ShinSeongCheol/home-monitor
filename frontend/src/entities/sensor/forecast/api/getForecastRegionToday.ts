import {backendUrl} from "../../../../shared";

export const getForecastRegionToday = async () => {
    const res = await fetch(`${backendUrl}/api/v1/forecast/region/today`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    
    return await res.json();
}