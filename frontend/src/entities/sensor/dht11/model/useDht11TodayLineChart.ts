import {useEffect, useState} from "react";
import type {LineSeries} from "@nivo/line";
import {getDht11TodayLog} from "../api/getDht11TodayLog.ts";
import type {Dht11} from "./type.ts";

export const useDht11TodayLineChart = () => {
    const [data, setData] = useState<LineSeries[] | null>(null);

    const fetchDht11TodayLog = async () => {
        try {
            const response: Dht11[] = await getDht11TodayLog();
            const temperatureData = response.map(value => ({x:value.measurementTime, y:value.temperature}));
            const humidityData = response.map(value => ({x: value.measurementTime, y:value.humidity}));

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
        fetchDht11TodayLog().catch(console.error);

        const interval = setInterval(fetchDht11TodayLog, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return {data};
}