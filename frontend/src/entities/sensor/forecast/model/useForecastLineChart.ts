import {useEffect, useState} from "react";
import type {LineSeries} from "@nivo/line";
import {getForecastRegionToday} from "../api/getForecastRegionToday.ts";
import type {Forecast} from "./type.ts";

export const useForecastLineChart = () => {
    const [data, setData] = useState<LineSeries[] | null>(null);

    const fetchForecastTodayLog = async () => {
        try {
            const response: Forecast[] = await getForecastRegionToday();
            const temperatureData = response.map(value => ({x:new Date(`${value.baseDate} ${value.baseTime}`), y:value.t1h}));
            const humidityData = response.map(value => ({x: new Date(`${value.baseDate} ${value.baseTime}`), y:value.reh}));

            const lineSeries: LineSeries[] = [
                {id: 'temperature', data: temperatureData},
                {id: 'humidity', data: humidityData},
            ]

            setData(lineSeries);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchForecastTodayLog().catch(console.error);

        const interval = setInterval(fetchForecastTodayLog, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return {data};
}