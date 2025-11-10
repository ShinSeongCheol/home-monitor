import type {Board} from "../../../pages/backoffice/ui/BackOfficeLayout.tsx";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../shared";
import type {AgGridReact} from "ag-grid-react";
import useFormattedDate from "../../../hooks/useFormattedDate.tsx";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import {DeleteButton, InsertButton} from "../../../shared/ui";
import {CsvButton, UpdateButton} from "../../../components/ButtonComponent.tsx";
import AgGridReactComponent from "../../../components/AgGridReactComponent.tsx";
import {EditBoardModal, InsertBoardModal} from "../../../components/BackOfficeModal.tsx";
import {Nav} from "../../../features/backoffice";
import {BackOfficeBoard} from "../../../features/backoffice/board";
import {BackOfficeModalLayout} from "../../../shared/ui/BackOfficeModalLayout.tsx";


export const BackOfficeBoardWidget = () => {

    const {auth} = useAuth();

    const [isInsertModalOpen, setIsInsertModalOpenOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpenOpen] = useState(false);
    const [editModalData, SetEditModalData] = useState();


    const agGridComponentRef = useRef<AgGridReact>(null);

    const {formattedDate} = useFormattedDate();

    const [rowData, setRowData] = useState<Board[]>([]);

    const [colDefs] = useState([
        {field: "id", headerName: "ID", filter: true, flex: 1},
        {field: "categoryCode", headerName: "코드", filter: true, flex: 1},
        {field: "categoryName", headerName: "이름", filter: true, flex: 1},
        {field: "comment", headerName: "설명", filter: true, flex: 1},
        {field: "createdAt", headerName: "생성일", cellDataType: "dateTime", filter: true, flex: 1},
        {field: "updatedAt", headerName: "수정일", cellDataType: "dateTime", filter: true, flex: 1},
    ]);

    const fetchData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boards`)
            .then(res => {
                if (!res.ok) throw new Error(`Http Error ${res.status}`);
                return res.json() as Promise<Board[]>;
            })
            .then(res => {
                setRowData(res);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onClickEdit = () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const rows = ref.api.getSelectedRows();
        if (rows.length === 0) return;
        const data = rows[0];

        setIsEditModalOpenOpen(true);
        SetEditModalData(data);
    }

    const onClickDelete = () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const rows = ref.api.getSelectedRows();
        if (rows.length === 0) return;
        const data = rows[0];

        if (!confirm(`${data.categoryName} 게시판을 삭제하시겠습니까?`)) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/board/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.accessToken}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`Http Error ${res.status}`);
                alert('게시판이 삭제되었습니다.');
                fetchData();
            })
            .catch(err => console.error(err));
    }

    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'게시판 목록'}/>
                <BackOfficeBoard />
            </div>

            {/*<div className={'styles.container'}>*/}
            {/*    <div className={`styles.buttonGroup`}>*/}
            {/*        <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value='추가' type='button'*/}
            {/*                      onClick={() => setIsInsertModalOpenOpen(true)}/>*/}
            {/*        <UpdateButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button'*/}
            {/*                      onClick={() => onClickEdit()}/>*/}
            {/*        <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button'*/}
            {/*                      onClick={() => onClickDelete()}/>*/}
            {/*        <CsvButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button'*/}
            {/*                   onClick={() => agGridComponentRef.current?.api.exportDataAsCsv({fileName: `게시판 목록 ${formattedDate}.csv`})}/>*/}
            {/*    </div>*/}
            {/*    <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs}*/}
            {/*                          rowData={rowData}></AgGridReactComponent>*/}
            {/*    <InsertBoardModal isOpen={isInsertModalOpen} setIsOpen={setIsInsertModalOpenOpen}*/}
            {/*                      fetchData={fetchData}></InsertBoardModal>*/}
            {/*    <EditBoardModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpenOpen} fetchData={fetchData}*/}
            {/*                    data={editModalData}></EditBoardModal>*/}
            {/*</div>*/}
        </section>
    )
}