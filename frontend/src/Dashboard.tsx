import styles from './styles/Dashboard.module.css'
import WeatherComponent from "./components/WeatherComponent";
import LineChartComponent from './components/LineChartComponent';
import HumiditySVG from './assets/humidity.svg?react';
import TemeratureSVG from './assets/device_thermostat.svg?react'
import { useEffect, useState } from 'react';

export type Data = {
    x: Date;
    y: number;
};

export type Datasets = {
    name: string; 
    data: Data[]; 
    color: string;
};

type Dht11Log = {
    measurementTime: string;
    temperature: number;
    humidity: number;
}

const Dashboard = () => {

    const [temperatureDatasets, setTemperatureDatasets] = useState<Datasets[]>([]);
    const [humidityDatasets, setHumidityDatasets] = useState<Datasets[]>([]);

    useEffect(() => {

        const fetchData = () => {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/dht11/log/today`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }else {
                    throw new Error(`Http Error : ${res.status}`);
                }
            })
            .then(data => {
                const temperature: Data[] = data.map((d: Dht11Log) => {return ({x: new Date(d.measurementTime), y: d.temperature})});
                const humidity: Data[] = data.map((d: Dht11Log) => {return ({x: new Date(d.measurementTime), y: d.humidity})});
        
                const insideTemperature = {
                    name: "inside temperature",
                    data: temperature,
                    color: "tomato"
                }
        
                const insideHumidity = {
                    name: "inside humidity",
                    data: humidity,
                    color: "steelblue"
                }

                setTemperatureDatasets(prev => [
                    ...prev.filter(data => data.name !== insideTemperature.name),
                    insideTemperature]
                );

                setHumidityDatasets(prev => [
                    ...prev.filter(data => data.name !== insideHumidity.name),
                    insideHumidity]
                );
            })
        }

        fetchData();

        const interval = setInterval(fetchData, 1000 * 60);
        return () => clearInterval(interval);
    }, [])
    
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <WeatherComponent></WeatherComponent>
                <LineChartComponent title='온도 추이 (24 시간)' icon={<TemeratureSVG width={"24px"} height={"24px"} fill='#ffa2a2ff' />} datasets={temperatureDatasets}></LineChartComponent>
                <LineChartComponent title='습도 추이 (24 시간)' icon={<HumiditySVG width={"24px"} height={"24px"} fill='#99ddfdff' />} datasets={humidityDatasets}></LineChartComponent>
            </section>
        </main>
    );
}

export default Dashboard;