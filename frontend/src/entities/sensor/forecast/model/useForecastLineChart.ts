import {useEffect, useState} from "react";
import {getForecastRegionToday} from "../api/getForecastRegionToday.ts";
import type {Forecast} from "./type.ts";
import type {TimeLineSeries} from "../../../../shared/model";

export const useForecastLineChart = () => {
    const [data, setData] = useState<TimeLineSeries[] | null>(null);

    const fetchForecastTodayLog = async () => {
        try {
            const response: Forecast[] = await getForecastRegionToday();
            const temperatureData = response.map(value => ({x:new Date(`${value.baseDate} ${value.baseTime}`), y:value.t1h}));
            const humidityData = response.map(value => ({x: new Date(`${value.baseDate} ${value.baseTime}`), y:value.reh}));

            const lineSeries: TimeLineSeries[] = [
                {
                    id: 'temperature',
                    color: '#E74C3C',
                    data: temperatureData
                },
                {
                    id: 'humidity',
                    color: '#3498DB',
                    data: humidityData
                },
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