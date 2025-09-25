import type { ICellRendererParams } from 'ag-grid-community';
import styles from '../styles/components/ButtonComponent.module.css';
import { Plus, SquarePen, Trash } from 'lucide-react';
import type { ReactNode } from 'react';

export const AgGridBoardButtonGroup = (props: ICellRendererParams) => {

    const onClickSquarePen = () => {
        console.log(props.data);
    }

    const onClickTrash = () => {
        console.log(props.data);
    }

    return (
        <div className={`${styles.aggrid} ${styles.container}`}>
            <SquarePen color='black' size={20} strokeWidth={2} onClick={onClickSquarePen}/>
            <Trash color='#ee4e4eff' size={20} strokeWidth={2} onClick={onClickTrash}/>
        </div>
    )
} 

type ButtonProps = {
    svg: ReactNode;
    value: string;
    type: "button" | "submit" | "reset";
    onClick: () => void;
}

export const InsertButton = ({svg, value, type, onClick}: ButtonProps) => {
    <Plus color='white' size={16} strokeWidth={2}/>
    return (
        <button className={`${styles.button} ${styles.insert}`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const CsvButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className={`${styles.button} ${styles.csv}`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const CancleButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className={`${styles.button} ${styles.cancle}`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const DeleteButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className={`${styles.button} ${styles.delete}`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}

interface agGridButtonProps extends ICellRendererParams {
    svg: ReactNode;
    value: string;
    type: "button" | "submit" | "reset";
    onClick : (data: any) => void;
}

export const AgGridDeleteButton = (props: agGridButtonProps) => {
    return (
        <button className={`${styles.aggrid} ${styles.button} ${styles.delete}`} type={props.type} onClick={() => props.onClick(props.data)}>{props.svg}{props.value}</button>
    )
} 


export const AgGridEditButton = (props: agGridButtonProps) => {
    return (
        <button className={`${styles.aggrid} ${styles.button} ${styles.edit}`} type={props.type} onClick={() => props.onClick(props.data)}>{props.svg}{props.value}</button>
    )
} 