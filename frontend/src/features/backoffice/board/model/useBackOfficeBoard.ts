import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {Board} from "../../../../entities/board";
import {getBackOfficeBoards} from "../../api/getBackOfficeBoards.ts";
import {deleteBoard} from "../api/deleteBoard.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";

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

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchBoard = async () => {
        try {
            const data: Board[] = await getBackOfficeBoards();
            setRowData(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        try {
            const data = ref.api.getSelectedRows()[0];
            if (!confirm(`${data.id} 삭제하시겠습니까?`)) return;

            await deleteBoard(data.id, auth?.accessToken);
            await fetchBoard();
        } catch (err) {
            console.error(err)
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `게시판 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchBoard().catch(console.error);
    }, []);

    return {
        isInsertOpen,
        isEditOpen,
        agGridComponentRef,
        colDefs,
        rowData,
        setIsInsertOpen,
        setIsEditOpen,
        fetchBoard,
        handleClickDelete,
        handleClickDownload
    };
}