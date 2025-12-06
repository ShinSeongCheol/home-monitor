import React from "react";

type CardProps = {
    label: string;
    icon: React.JSX.Element;
    value: string;
    time: string;
}

export const Card = ({label, icon, value, time}: CardProps) => {
    return (
        <div className={'w-full bg-white border border-gray-300 rounded-sm flex flex-col p-2'}>
            <div className={'flex items-center'}>
                <span>{icon}</span>
                <p className={'text-sm md:text-lg'}>{label}</p>
            </div>
            <div className={'mt-2'}>
                <span className={'text-xl md:text-2xl font-bold'}>{value}</span>
                <p className={'mt-2 text-xs md:text-sm'}>{time}</p>
            </div>
        </div>
    )
}