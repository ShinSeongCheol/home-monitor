import styles from './styles/Dashboard.module.css'
import WeatherComponent from "./components/WeatherComponent";
import LineChartComponent from './components/LineChartComponent';
import HumiditySVG from './assets/humidity.svg?react';
import TemeratureSVG from './assets/device_thermostat.svg?react'

const Dashboard = () => {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <WeatherComponent></WeatherComponent>
                <LineChartComponent title='온도 추이' icon={<TemeratureSVG width={"24px"} height={"24px"} fill='#ffa2a2ff'/>}></LineChartComponent>
                <LineChartComponent title='습도 추이' icon={<HumiditySVG width={"24px"} height={"24px"} fill='#99ddfdff'/>}></LineChartComponent>
            </section>
        </main>
    );
}

export default Dashboard;