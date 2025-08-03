import React from "react";
import '../styles/InfoCard.css'

type InfoCardProps = {
    id: string;
    value: string | number;
    unit: string;
    label: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ id, value, unit, label }) => {
    return (
        <>
            <div className="card">
                <div className="label">{label}</div>
                <div className="value" id={id}>
                    {value} {unit}
                </div>
            </div>
        </>
    )
}

export default InfoCard;