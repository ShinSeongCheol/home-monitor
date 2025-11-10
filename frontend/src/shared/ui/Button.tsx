import type { ButtonProps } from "../model"

export const CancelButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className='cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700' type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const EditButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className='cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white' type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const DeleteButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className='cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white' type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const InsertButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className={`cursor-pointer border-none min-w-[80px] h-[30px] flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}