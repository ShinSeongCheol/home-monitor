import styles from './styles/Dashboard.module.css'
import WeatherComponent from "./components/WeatherComponent";
import LineChartComponent from './components/LineChartComponent';
import HumiditySVG from './assets/humidity.svg?react';
import TemeratureSVG from './assets/device_thermostat.svg?react'

export type Data = {
    x: Date;
    y: number;
};

export type Datasets = {
    name: string; 
    data: Data[]; 
    color: string
}

const Dashboard = () => {
    
    const data1: Data[] = [
        { x: new Date(), y: 1 },
        { x: new Date(), y: 3 },
        { x: new Date(), y: 2 },
        { x: new Date(), y: 6 },
        { x: new Date(), y: 5 },
        { x: new Date(), y: 9 },
    ];
    
    const data2: Data[] = [
        { x: new Date(), y: 10 },
        { x: new Date(), y: 30 },
        { x: new Date(), y: 20 },
        { x: new Date(), y: 60 },
        { x: new Date(), y: 50 },
        { x: new Date(), y: 90 },
    ];
    
    const datasets: Datasets[] = [
        { name: "A", data: data1, color: "steelblue" },
        { name: "B", data: data2, color: "tomato" }
    ];

    console.log(datasets);

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <WeatherComponent></WeatherComponent>
                <LineChartComponent title='온도 추이' icon={<TemeratureSVG width={"24px"} height={"24px"} fill='#ffa2a2ff' />} datasets={datasets}></LineChartComponent>
                <LineChartComponent title='습도 추이' icon={<HumiditySVG width={"24px"} height={"24px"} fill='#99ddfdff' />} datasets={datasets}></LineChartComponent>
            </section>
        </main>
    );
}

export default Dashboard;