import React from "react";
import styles from '../styles/InfoCard.module.css'

interface InfoCardProps {
    value: string | number,
    unit: string,
    label: string,
}

const InfoCard: React.FC<InfoCardProps> = ({ value, unit, label }) => {
    return (
        <>
            <div className={styles.card}>
                <span className={styles.label}>{label}</span> <span className={styles.value}>{value} {unit}</span>
            </div>
        </>
    )
}

export default InfoCard;