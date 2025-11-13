import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {BackOfficeMemberRole} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";
import type {ValueFormatterParams} from "ag-grid-community";
import {getBackOfficeUserRoles} from "../../api/getBackOfficeUserRoles.ts";
import {deleteUserRole} from "../api/deleteUserRole.ts";

export const useBackOfficeUserRole = () => {

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const agGridComponentRef = useRef<AgGridReact | null>(null)

    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        {
            headerName: "사용자",
            children: [
                {
                    colId: "member_email",
                    headerName: "이메일",
                    filter: true,
                    field: "member.email",
                    flex:1,
                },
                {
                    colId: "member_username",
                    headerName: "이름",
                    filter: true,
                    field: "member.username",
                    flex:1,
                },
                {
                    colId: "member_password",
                    headerName: "비밀번호",
                    filter: true,
                    field: "member.password",
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
    const [rowData, setRowData] = useState<BackOfficeMemberRole[]>([]);
    const [data, setData] = useState<BackOfficeMemberRole>();

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchUserRoles = async () => {
        try {
            const userRoleCodes: BackOfficeMemberRole[] = await getBackOfficeUserRoles();
            setRowData(userRoleCodes);
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        if (!data) return;

        if (!confirm(`${data.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deleteUserRole(data.id, auth?.accessToken);
            await fetchUserRoles();
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `유저 권한 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchUserRoles().catch(console.error);
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
        fetchUserRoles,
        handleClickDelete,
        handleClickDownload
    }
}