import {useEffect, useState} from "react";
import type {Dht11} from "./type.ts";
import {getDht11LatestLog} from "../api/getDht11LatestLog.ts";

export const useDht11Card = () => {
    const [dht11LatestLog, setDht11LatestLog] = useState<Dht11 | null>(null);

    const fetchDht11LatestLog = async () => {
        try {
            const data:Dht11 = await getDht11LatestLog()
            setDht11LatestLog(data);
        }catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchDht11LatestLog().catch(console.error);

        const interval = setInterval(fetchDht11LatestLog, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return {dht11LatestLog}
}