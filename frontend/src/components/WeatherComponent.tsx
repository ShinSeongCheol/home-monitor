import styles from '../styles/components/WeatherComponent.module.css';
import { useEffect, useState } from 'react';
import { Droplet, Thermometer } from 'lucide-react';

const weatherComponent = () => {

    const [insideTemperature, setInsideTemperature] = useState<string | null>(null);
    const [insideHumidity, setInsideHumidity] = useState<string | null>(null);
    const [insideMeasurementTime, setInsideMeasurementTime] = useState<string | null>(null);

    const [outsideTemperature, setOutsideTemperature] = useState<string | null>(null);
    const [outsideHumidity, setOutsideHumidity] = useState<string | null>(null);
    const [outsideMeasurementTime, setOutsideMeasurementTime] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = () => {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/dht11/log/latest`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(`Http Error : ${res.status}`);
                    }
                })
                .then(data => {
                    const temperature = data.temperature;
                    const humidity = data.humidity;
                    const measurementTime:Date = new Date(data.measurementTime);

                    setInsideTemperature(temperature);
                    setInsideHumidity(humidity);
                    setInsideMeasurementTime(measurementTime.toLocaleString());
                })
        }

        fetchData();

        const interval = setInterval(fetchData, 1000 * 60);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const fetchData = () => {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/forecast/region/latest`)
            .then(res => {
                if(!res.ok) throw new Error(`Http Error ${res.status}`);
                return res.json();
            })
            .then(data => {
                setOutsideTemperature(data.t1h);
                setOutsideHumidity(data.reh);
                setOutsideMeasurementTime(new Date(data.baseDate + " " + data.baseTime).toLocaleString());
            })
            .catch(err => {
                console.error(err);
            })
        }

        fetchData();

        const interval = setInterval(fetchData, 1000 * 60);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>실내 온도</p>
                    <span><Thermometer size={'24px'} fill='#FFB266' color='#FFB266' strokeWidth={1} /></span>
                </div>
                <div className={styles.cardContent}>
                    <span>{`${insideTemperature ?? ""}°C`}</span>
                    <p>{insideMeasurementTime}</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>외부 온도</p>
                    <span><Thermometer size={'24px'} fill='#E74C3C' color='#E74C3C' strokeWidth={1}/></span>
                </div>
                <div className={styles.cardContent}>
                    <span>{`${outsideTemperature ?? ""}°C`}</span>
                    <p>{outsideMeasurementTime}</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>실내 습도</p>
                    <span><Droplet size={'24px'} fill='#85C1E9' color='#85C1E9' strokeWidth={1} /></span>
                </div>
                <div className={styles.cardContent}>
                    <span>{`${insideHumidity ?? ""}%`}</span>
                    <p>{insideMeasurementTime}</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>외부 습도</p>
                    <span><Droplet size={'24px'} fill='#3498DB' color='#3498DB' strokeWidth={1} /></span>
                </div>
                <div className={styles.cardContent}>
                    <span>{`${outsideHumidity ?? ""}%`}</span>
                    <p>{outsideMeasurementTime}</p>
                </div>
            </div>
        </div>
    )
}

export default weatherComponent;
