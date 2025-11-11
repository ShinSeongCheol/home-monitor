import {useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import type {BackOfficePost} from "../../model/type.ts";
import {useFormattedDate} from "../../../../shared/lib";
import {useAuth} from "../../../../shared";
import {deletePost} from "../api/deletePost.ts";
import {getBackOfficePosts} from "../../api/getBackOfficePosts.ts";

export const useBackOfficePost = () => {

    const agGridComponentRef = useRef<AgGridReact | null>(null)

    const [isInsertOpen, setIsInsertOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [colDefs] = useState([
        {field: "id", headerName: "ID", filter: true, flex: 1,},
        {
            headerName: "게시판",
            children: [
                {
                    colId: "board_category_code",
                    headerName: "코드",
                    filter: true,
                    field: "board.categoryCode",
                    flex: 1,
                },
                {
                    colId: "board_category_name",
                    headerName: "이름",
                    filter: true,
                    field: "board.categoryCode",
                    flex: 1,
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
                    flex: 1,
                },
                {
                    colId: "member_username",
                    headerName: "이름",
                    filter: true,
                    field: "member.username",
                    flex: 1,
                },
            ]
        },
        {field: "title", headerName: "제목", filter: true, flex: 1,},
        {field: "content", headerName: "내용", filter: true, flex: 1,},
        {field: "createdAt", headerName: "생성일", cellDataType: "dateTime", filter: true, flex: 1,},
        {field: "updatedAt", headerName: "수정일", cellDataType: "dateTime", filter: true, flex: 1,},
        {field: "view", headerName: "조회수", filter: true, flex: 1,},
    ]);
    const [rowData, setRowData] = useState<BackOfficePost[]>([]);

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const fetchPosts = async () => {
        try {
            const data: BackOfficePost[] = await getBackOfficePosts();
            setRowData(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDelete = async () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const selectedRow = ref.api.getSelectedRows()[0];

        if (!confirm(`${selectedRow.id} 번 게시물을 삭제하시겠습니까?`)) return;

        try {
            await deletePost(selectedRow.id, auth?.accessToken);
            await fetchPosts();
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current
        if (!ref) return;

        ref.api.exportDataAsCsv({fileName: `게시물 목록 ${formattedDate}.csv`})
    }

    useEffect(() => {
        fetchPosts().catch(console.error);
    }, [])

    return {
        isInsertOpen,
        setIsInsertOpen,
        isEditOpen,
        setIsEditOpen,
        agGridComponentRef,
        colDefs,
        rowData,
        fetchPosts,
        handleClickDelete,
        handleClickDownload
    };
}