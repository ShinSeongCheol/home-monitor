import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {BackOfficeBoardRoleCode} from "../../model/type.ts";
import {useFormattedDate} from "../../../../shared/lib";
import {getBackOfficeBoardRoleCodes} from "../../api/getBackOfficeBoardRoleCodes.ts";
import {deleteBoardRoleCode} from "../api/deleteBoardRoleCode.ts";
import {useAuth} from "../../../../shared";

export const useBackOfficeBoardRoleCode = () => {

    const agGridComponentRef = useRef<AgGridReact | null>(null)

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        { field: "code", headerName: "코드", filter: true, flex:1, },
        { field: "name", headerName: "이름", filter: true, flex:1, },
    ]);
    const [rowData, setRowData] = useState<BackOfficeBoardRoleCode[]>([]);

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchBoardRoleCodes = async () => {
        try {
            const data:BackOfficeBoardRoleCode[] = await getBackOfficeBoardRoleCodes();
            setRowData(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const selectedRow = ref.api.getSelectedRows()[0];

        if (!confirm(`${selectedRow.id} 번 게시판 권한 코드를 삭제하시겠습니까?`)) return;

        try {
            await deleteBoardRoleCode(selectedRow.id, auth?.accessToken);
            await fetchBoardRoleCodes();
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `게시판 권한 코드 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchBoardRoleCodes().catch(console.error);
    }, [])

    return {isInsertOpen, setIsInsertOpen, isEditOpen, setIsEditOpen, agGridComponentRef, colDefs, rowData, fetchBoardRoleCodes, handleClickDelete, handleClickDownload};
}