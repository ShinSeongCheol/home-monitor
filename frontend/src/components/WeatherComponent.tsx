import styles from '../styles/weatherComponent.module.css';
import HumiditySVG from '../assets/humidity.svg?react';
import TemeratureSVG from '../assets/device_thermostat.svg?react'

const weatherComponent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>실내 온도</p>
                    <span><TemeratureSVG width={"24px"} height={"24px"} fill='#ffa2a2ff'></TemeratureSVG></span>
                </div>
                <div className={styles.cardContent}>
                    <span>36.3°C</span>
                    <p>2025.08.25</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>실내 습도</p>
                    <span><HumiditySVG width={"24px"} height={"24px"} fill='#99ddfdff'></HumiditySVG></span>
                </div>
                <div className={styles.cardContent}>
                    <span>73.1%</span>
                    <p>2025.08.25</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>외부 온도</p>
                    <span><TemeratureSVG width={"24px"} height={"24px"} fill='#ffa2a2ff'></TemeratureSVG></span>
                </div>
                <div className={styles.cardContent}>
                    <span>36.3°C</span>
                    <p>2025.08.25</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p>외부 습도</p>
                    <span><HumiditySVG width={"24px"} height={"24px"} fill='#99ddfdff'></HumiditySVG></span>
                </div>
                <div className={styles.cardContent}>
                    <span>73.1%</span>
                    <p>2025.08.25</p>
                </div>
            </div>
        </div>
    )
}

export default weatherComponent;
