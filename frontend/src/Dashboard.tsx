import styles from './styles/Dashboard.module.css'
import WeatherComponent from "./components/WeatherComponent";
import LineChartComponent from './components/LineChartComponent';


const Dashboard = () => {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <WeatherComponent></WeatherComponent>
                <LineChartComponent></LineChartComponent>
            </section>
        </main>
    );
}

export default Dashboard;