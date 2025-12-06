import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {ValueFormatterParams} from "ag-grid-community";
import type {BackOfficeComment} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";
import {getBackOfficeComments} from "../../api/getBackOfficeComments.ts";
import {deleteComment} from "../api/deleteComment.ts";

export const useBackOfficeComment = () => {

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const agGridComponentRef = useRef<AgGridReact | null>(null)
    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        { field: "parentComment.id", headerName: "부모 댓글 ID", filter: true, flex:1, },
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
        { field: "content", headerName: "내용", filter: true, flex:1, },
        { field: "reactions", headerName: "반응수", filter: true, flex:1,
            valueFormatter: (params : ValueFormatterParams) => {
                return params.value.length
            }
        },
        { field: "createdAt", headerName: "생성일", cellDataType: "dateTime", filter: true, flex:1, },
        { field: "updatedAt", headerName: "수정일", cellDataType: "dateTime", filter: true, flex:1, },
    ]);
    const [rowData, setRowData] = useState<BackOfficeComment[]>([]);
    const [data, setData] = useState<BackOfficeComment>();

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchComments = async () => {
        try {
            const comments = await getBackOfficeComments();
            setRowData(comments);
        }catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        if (!data) return;

        if (!confirm(`${data.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deleteComment(data.id, auth?.accessToken);
            await fetchComments();
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `댓글 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchComments().catch(console.error);
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
        fetchComments,
        handleClickDelete,
        handleClickDownload
    };
}