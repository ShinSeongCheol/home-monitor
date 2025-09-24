import type { ICellRendererParams } from 'ag-grid-community';
import styles from '../styles/components/ButtonComponent.module.css';
import { Download, Plus, SquarePen, Trash } from 'lucide-react';

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
    value: string;
    onClick: () => void;
}

export const InsertButton = ({value, onClick}: ButtonProps) => {
    return (
        <button className={`${styles.button} ${styles.insert}`} type="button" onClick={onClick}><Plus color='white' size={16} strokeWidth={2}/>{value}</button>
    )
}

export const CsvButton = ({value, onClick}: ButtonProps) => {
    return (
        <button className={`${styles.button} ${styles.csv}`} type="button" onClick={onClick}><Download color='white' size={16} strokeWidth={2}/>{value}</button>
    )
}

export const AgGridDeleteButton = (props: ICellRendererParams) => {

    const onClickDelete = () => {
        console.log(props.data);
    }

    return (
        <button className={`${styles.aggrid} ${styles.button} ${styles.delete}`} type="button" onClick={onClickDelete}><Trash color='white' size={20} strokeWidth={2} />{'삭제'}</button>
    )
} 


export const AgGridEditButton = (props: ICellRendererParams) => {

    const onClickEdit = () => {
        console.log(props.data);
    }

    return (
        <button className={`${styles.aggrid} ${styles.button} ${styles.edit}`} type="button" onClick={onClickEdit}><SquarePen color='white' size={20} strokeWidth={2} />{'수정'}</button>
    )
} 