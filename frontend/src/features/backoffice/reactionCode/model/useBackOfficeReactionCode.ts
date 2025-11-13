import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {ReactionCode} from "../../../../pages/backoffice/ui/BackOfficeLayout.tsx";
import type {BackOfficeReactionCode} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";
import {getBackOfficeReactionCodes} from "../../api/getBackOfficeReactionCodes.ts";
import {deleteReactionCode} from "../api/deleteReactionCode.ts";

export const useBackOfficeReactionCode = () => {

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const agGridComponentRef = useRef<AgGridReact | null>(null)

    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        { field: "code", headerName: "코드", filter: true, flex:1, },
        { field: "name", headerName: "이름", filter: true, flex:1, },
    ]);
    const [rowData, setRowData] = useState<ReactionCode[]>([]);
    const [data, setData] = useState<BackOfficeReactionCode>();

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchReactionCodes = async () => {
        try {
            const reactionCodes: BackOfficeReactionCode[] = await getBackOfficeReactionCodes();
            setRowData(reactionCodes);
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        if (!data) return;

        if (!confirm(`${data.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deleteReactionCode(data.id, auth?.accessToken);
            await fetchReactionCodes();
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `반응 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchReactionCodes().catch(console.error);
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
        fetchReactionCodes,
        handleClickDelete,
        handleClickDownload
    }
}