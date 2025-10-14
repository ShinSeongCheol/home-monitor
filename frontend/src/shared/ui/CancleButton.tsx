import type { ButtonProps } from "../model/ButtonProps"

export const CancleButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className='cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700' type={type} onClick={onClick}>{svg}{value}</button>
    )
}