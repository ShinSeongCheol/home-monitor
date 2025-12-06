import {backendUrl} from "../../../../shared";

export const getDht11TodayLog = async () => {
    const res = await fetch(`${backendUrl}/api/v1/dht11/log/today`);
    if (!res.ok) throw new Error(`Http Error : ${res.status}`);

    return await res.json()
}