import type { ICellRendererParams } from 'ag-grid-community';
import styles from '../styles/components/ButtonComponent.module.css';
import { SquarePen, Trash } from 'lucide-react';
import type { ChangeEventHandler, ReactNode } from 'react';

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
    return (
        <button className={`${styles.button} ${styles.insert}`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}

export const UpdateButton = ({svg, value, type, onClick}: ButtonProps) => {
    return (
        <button className={`${styles.button} ${styles.edit}`} type={type} onClick={onClick}>{svg}{value}</button>
    )
}

type FileButtonProps = {
    svg: ReactNode;
    value: string;
    type: "button" | "file";
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const FileButton = ({svg, value, type, onChange}: FileButtonProps) => {
    return (
        <div>
            <label className={`${styles.label} ${styles.csv}`} htmlFor="fileInput">{svg}{value}</label>
            <input className={styles.fileInput} type="file" name="fileInput" id="fileInput" onChange={onChange} />
        </div>
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