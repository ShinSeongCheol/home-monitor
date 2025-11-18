import {useEffect, useState} from "react";
import {getDht11TodayLog} from "../api/getDht11TodayLog.ts";
import type {Dht11} from "./type.ts";
import type {TimeLineSeries} from "../../../../shared/model";

export const useDht11TodayLineChart = () => {
    const [data, setData] = useState<TimeLineSeries[] | null>(null);

    const fetchDht11TodayLog = async () => {
        try {
            const response: Dht11[] = await getDht11TodayLog();
            const temperatureData = response.map(value => ({x:value.measurementTime, y:value.temperature}));
            const humidityData = response.map(value => ({x: value.measurementTime, y:value.humidity}));

            const lineSeries: TimeLineSeries[] = [
                {
                    id: 'temperature',
                    color: '#FFB266',
                    data: temperatureData
                },
                {
                    id: 'humidity',
                    color: '#85C1E9',
                    data: humidityData
                },
            ]

            setData(lineSeries);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchDht11TodayLog().catch(console.error);

        const interval = setInterval(fetchDht11TodayLog, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return {data};
}