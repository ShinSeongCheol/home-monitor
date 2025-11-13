import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {BackOfficeReaction} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";
import {getBackOfficeReactions} from "../../api/getBackOfficeReactions.ts";
import {deleteReaction} from "../api/deleteReaction.ts";

export const useBackOfficeReaction = () => {
    const agGridComponentRef = useRef<AgGridReact | null>(null)
    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        {
            headerName: "게시물",
            children: [
                {
                    colId: "post_id",
                    headerName: "ID",
                    filter: true,
                    field: "post.id",
                    flex:1,
                },
                {
                    colId: "post_title",
                    headerName: "제목",
                    filter: true,
                    field: "post.title",
                    flex:1,
                },
                {
                    colId: "post_member_username",
                    headerName: "작성자",
                    filter: true,
                    field: "post.member.username",
                    flex:1,
                },
                {
                    colId: "post_member_email",
                    headerName: "이메일",
                    filter: true,
                    field: "post.member.email",
                    flex:1,
                },
            ]
        },
        {
            headerName: "댓글",
            children: [
                {
                    colId: "comment_id",
                    headerName: "ID",
                    filter: true,
                    field: "comment.id",
                    flex:1,
                },
                {
                    colId: "comment_content",
                    headerName: "내용",
                    filter: true,
                    field: "comment.content",
                    flex:1,
                },
                {
                    colId: "comment_member_username",
                    headerName: "작성자",
                    filter: true,
                    field: "comment.member.username",
                    flex:1,
                },
                {
                    colId: "comment_member_email",
                    headerName: "이메일",
                    filter: true,
                    field: "comment.member.email",
                    flex:1,
                },
            ]
        },
        {
            headerName: "작성자",
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
            ]
        },
        {
            headerName: "반응 코드",
            children: [
                {
                    colId: "reactionCode.code",
                    headerName: "코드",
                    filter: true,
                    field: "reactionCode.code",
                    flex:1,
                },
                {
                    colId: "reactionCode.name",
                    headerName: "이름",
                    filter: true,
                    field: "reactionCode.name",
                    flex:1,
                },

            ]
        },
    ]);
    const [rowData, setRowData] = useState<BackOfficeReaction[]>([]);
    const [data, setData] = useState<BackOfficeReaction>();

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchReactions = async () => {
        try {
            const data:BackOfficeReaction[] = await getBackOfficeReactions();
            setRowData(data);
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const selectedRow = ref.api.getSelectedRows()[0];

        if (!confirm(`${selectedRow.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deleteReaction(selectedRow.id, auth?.accessToken);
            await fetchReactions();
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
        fetchReactions().catch(console.error);
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
        fetchReactions,
        handleClickDelete,
        handleClickDownload
    };
}