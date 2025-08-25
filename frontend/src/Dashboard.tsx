import { useState, useEffect } from "react";
import InfoCard from "./components/InfoCard";
import LineChart from "./components/LineChart";

import styles from './styles/Dashboard.module.css'
import WeatherComponent from "./components/WeatherComponent";


const Dashboard = () => {
    // const [measurementTime, setMesurementTime] = useState<string | Date>('--');
    // const [temperature, setTemperature] = useState<string | number>('--');
    // const [humidity, setHumidity] = useState<string | number>('--');

    // useEffect(() => {
    //     const fetchData = () => {
    //         fetch(`${import.meta.env.VITE_API_URL}/api/v1/dht11/log/latest`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 const measurementTime = new Date(data.measurementTime);
    //                 const temperature = data.temperature;
    //                 const humidity = data.humidity;

    //                 setMesurementTime(measurementTime);
    //                 setTemperature(temperature);
    //                 setHumidity(humidity);
    //             }
    //             )
    //     }

    //     fetchData();

    //     const interval = setInterval(fetchData, 60000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        // <>
        //     <div className={styles.container}>
        //         <InfoCard value={temperature} unit='°C' label='🌡️ 온도: '></InfoCard>
        //         <InfoCard value={humidity} unit='%' label='💧 습도: '></InfoCard>
        //     </div>
        //     <LineChart></LineChart>
        //     <div className={styles.timestamp} id="timestamp">마지막 업데이트: {measurementTime.toLocaleString()}</div>
        // </>
        <main className={styles.main}>
            <section className={styles.section}>
                <WeatherComponent></WeatherComponent>
            </section>
        </main>
    );
}

export default Dashboard;