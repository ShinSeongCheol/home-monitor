import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {Board} from "../../../../entities/board";
import {getBackOfficeBoards} from "../../../../entities/board/api/getBackOfficeBoards.ts";

export const useBackOfficeBoard = () => {

    const agGridComponentRef = useRef<AgGridReact>(null);

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [rowData, setRowData] = useState<Board[]>([]);

    const [colDefs] = useState([
        {field: "id", headerName: "ID", filter: true, flex: 1},
        {field: "categoryCode", headerName: "코드", filter: true, flex: 1},
        {field: "categoryName", headerName: "이름", filter: true, flex: 1},
        {field: "comment", headerName: "설명", filter: true, flex: 1},
        {field: "createdAt", headerName: "생성일", cellDataType: "dateTime", filter: true, flex: 1},
        {field: "updatedAt", headerName: "수정일", cellDataType: "dateTime", filter: true, flex: 1},
    ]);

    const fetchBoard = async () => {
        try {
            const data: Board[] = await getBackOfficeBoards();
            setRowData(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchBoard().catch(console.error);
    }, []);

    return {isInsertOpen, isEditOpen, agGridComponentRef, colDefs, rowData, setIsInsertOpen, setIsEditOpen, fetchBoard};
}