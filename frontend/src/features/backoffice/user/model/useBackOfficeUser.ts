import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {BackOfficeMember} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";

import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";
import {deleteUser} from "../api/deleteUser.ts";

export const useBackOfficeUser = () => {

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const agGridComponentRef = useRef<AgGridReact | null>(null)

    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        { field: "email", headerName: "이메일", filter: true, flex:1, },
        { field: "username", headerName: "이름", filter: true, flex:1, },
        { field: "password", headerName: "비밀번호", filter: true, flex:1, },
    ]);
    const [rowData, setRowData] = useState<BackOfficeMember[]>([]);
    const [data, setData] = useState<BackOfficeMember>();

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchUsers = async () => {
        try {
            const users: BackOfficeMember[] = await getBackOfficeMembers();
            setRowData(users);
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        if (!data) return;

        if (!confirm(`${data.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deleteUser(data.id, auth?.accessToken);
            await fetchUsers();
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `유저 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchUsers().catch(console.error);
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
        fetchUsers,
        handleClickDelete,
        handleClickDownload
    };
}