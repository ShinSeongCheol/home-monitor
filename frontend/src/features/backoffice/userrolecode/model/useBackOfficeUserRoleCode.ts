import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {BackOfficeMemberRoleCode} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";
import {getBackOfficeUserRoleCodes} from "../../api/getBackOfficeUserRoleCodes.ts";
import {deleteUserRoleCode} from "../api/deleteUserRoleCode.ts";

export const useBackOfficeUserRoleCode = () => {

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const agGridComponentRef = useRef<AgGridReact | null>(null)

    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        { field: "code", headerName: "코드", filter: true, flex:1, },
        { field: "name", headerName: "이름", filter: true, flex:1, },
    ]);
    const [rowData, setRowData] = useState<BackOfficeMemberRoleCode[]>([]);
    const [data, setData] = useState<BackOfficeMemberRoleCode>();

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchUserRoleCodes = async () => {
        try {
            const userRoleCodes: BackOfficeMemberRoleCode[] = await getBackOfficeUserRoleCodes();
            setRowData(userRoleCodes);
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        if (!data) return;

        if (!confirm(`${data.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deleteUserRoleCode(data.id, auth?.accessToken);
            await fetchUserRoleCodes();
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `유저 권한 코드 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchUserRoleCodes().catch(console.error);
    }, []);

    return {
        isInsertOpen,
        setIsInsertOpen,
        isEditOpen,
        setIsEditOpen,
        agGridComponentRef,
        colDefs,
        rowData,
        data,
        setData,
        fetchUserRoleCodes,
        handleClickDelete,
        handleClickDownload
    }
}