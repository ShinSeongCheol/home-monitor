import type { ButtonProps } from "../model/ButtonProps"

export const InsertButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className={`cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}