import React from "react";
import styles from '../styles/InfoCard.module.css'

interface InfoCardProps {
    id: string,
    value: string | number,
    unit: string,
    label: string,
}

const InfoCard: React.FC<InfoCardProps> = ({ id, value, unit, label }) => {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value} id={id}>
                    {value} {unit}
                </div>
            </div>
        </>
    )
}

export default InfoCard;