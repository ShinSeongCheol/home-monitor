import {useEffect, useState} from "react";
import {getForecastRegionLatest} from "../api/getForecastRegionLatest.ts";
import type {Forecast} from "./type.ts";

export const useForecastCard = () => {
    const [forecastLatestLog, setForecastLatestLog] = useState<Forecast | null>(null);

    const fetchForecastLatestLog = async () => {
        try {
            const data:Forecast = await getForecastRegionLatest();
            setForecastLatestLog(data);
        }catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchForecastLatestLog().catch(console.error);

        const interval = setInterval(fetchForecastLatestLog, 1000 * 60)
        return () => clearInterval(interval);
    }, []);

    return {forecastLatestLog};
}