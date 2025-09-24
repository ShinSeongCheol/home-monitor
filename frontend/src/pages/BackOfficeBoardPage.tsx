import styles from '../styles/pages/BackOfficeBoardPage.module.css';
import AgGridReactComponent from '../components/AgGridReactComponent';
import { useState } from 'react';
import type { ColDef } from 'ag-grid-community';

type Board = {
    id: number;
    categoryCode: string | null;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

const BackOfficeBoard = () => {


    
    const [rowData, setRowData] = useState<Board[]>([
    ]);
    
    const [colDefs] = useState<ColDef<Board>[]>([
        { field: "id", headerName: "ID", filter: true },
        { field: "categoryCode", headerName: "코드", filter: true },
        { field: "categoryName", headerName: "이름", filter: true },
        { field: "comment", headerName: "설명", filter: true },
        { field: "createdAt", headerName: "생성일", filter: true },
        { field: "updatedAt", headerName: "수정일", filter: true },
    ]);

    
    return (
        <section className={`${styles.section}`}>
            <AgGridReactComponent colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
        </section>
    )
}

export default BackOfficeBoard;