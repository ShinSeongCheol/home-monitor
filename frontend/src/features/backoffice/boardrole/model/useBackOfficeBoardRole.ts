import {useEffect, useRef, useState} from "react";
import type {ValueFormatterParams} from "ag-grid-community";
import type {AgGridReact} from "ag-grid-react";
import {useFormattedDate} from "../../../../shared/lib";
import {useAuth} from "../../../../shared";
import {deleteBoardRole} from "../api/deleteBoardRole.ts";
import {getBackOfficeBoardRoles} from "../../api/getBackOfficeBoardRoles.ts";
import type {BackOfficeBoardRole} from "../../model/type.ts";

export const useBackOfficeBoardRole = () => {

    const agGridComponentRef = useRef<AgGridReact>(null);

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        {
            headerName: "게시판",
            children: [
                {
                    colId: "board_category_code",
                    headerName: "코드",
                    filter: true,
                    field: "board.categoryCode",
                    flex:1,
                },
                {
                    colId: "board_category_name",
                    headerName: "이름",
                    filter: true,
                    field: "board.categoryCode",
                    flex:1,
                },
                {
                    colId: "board_comment",
                    headerName: "설명",
                    field: "board.comment",
                    flex:1,
                },
            ]
        },
        {
            headerName: "게시판 권한 코드",
            children: [
                {
                    colId: "board_role_code_code",
                    headerName: "코드",
                    filter: true,
                    field: "boardRoleCode.code",
                    flex:1,
                },
                {
                    colId: "board_role_code_name",
                    headerName: "이름",
                    filter: true,
                    field: "boardRoleCode.name",
                    flex:1,
                },
            ]
        },
        {
            headerName: "사용자 권한 코드",
            children: [
                {
                    colId: "member_role_code_code",
                    headerName: "코드",
                    filter: true,
                    field: "memberRoleCode.code",
                    flex:1,
                    valueFormatter: (params : ValueFormatterParams) => {
                        return params.value ? params.value : "전체";
                    }
                },
                {
                    colId: "member_role_code_name",
                    headerName: "이름",
                    filter: true,
                    field: "memberRoleCode.name",
                    flex:1,
                    valueFormatter: (params : ValueFormatterParams) => {
                        return params.value ? params.value : "전체";
                    }
                },
            ]
        },
    ]);

    const [rowData, setRowData] = useState<BackOfficeBoardRole[]>([]);

    const {auth} = useAuth();

    const {formattedDate} = useFormattedDate();

    const handleClickDelete = async () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const rows = ref.api.getSelectedRows();
        if (rows.length === 0) return ;
        const data = rows[0];

        if(!confirm(`${data.id}번 게시판 권한을 삭제하시겠습니까?`)) return;

        try {
            await deleteBoardRole(data.id, auth?.accessToken);
            await fetchBoardRoles();
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current;
        if(!ref) return;

        ref.api.exportDataAsCsv({fileName:`게시판 권한 목록 ${formattedDate}.csv`});
    }

    const fetchBoardRoles = async () => {
        try {
            const data:BackOfficeBoardRole[] = await getBackOfficeBoardRoles();
            setRowData(data);
        }catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchBoardRoles().catch(console.error);
    }, [])

    return {isInsertOpen, isEditOpen, agGridComponentRef, colDefs, rowData, setIsInsertOpen, setIsEditOpen, handleClickDelete, handleClickDownload, fetchBoardRoles};
}