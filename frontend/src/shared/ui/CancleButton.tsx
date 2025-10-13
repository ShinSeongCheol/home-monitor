import type { ReactNode } from "react";

type ButtonProps = {
    svg: ReactNode;
    value: string;
    type: "button" | "submit" | "reset";
    onClick: () => void;
}

export const CancleButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className='cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700' type={type} onClick={onClick}>{svg}{value}</button>
    )
}