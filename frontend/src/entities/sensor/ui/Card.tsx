import React from "react";

type CardProps = {
    label: string;
    icon: React.JSX.Element;
    value: string;
    time: string;
}

export const Card = ({label, icon, value, time}: CardProps) => {
    return (
        <div className={'w-full bg-white border border-gray-300 rounded-sm flex flex-col p-2 styles.card'}>
            <div className={'flex items-center styles.cardHeader'}>
                <span>{icon}</span>
                <p>{label}</p>
            </div>
            <div className={'mt-2 styles.cardContent'}>
                <span className={'text-2xl font-bold'}>{value}</span>
                <p className={'mt-2 text-sm'}>{time}</p>
            </div>
        </div>
    )
}