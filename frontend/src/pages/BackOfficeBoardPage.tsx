import styles from '../styles/pages/BackOfficeBoardPage.module.css';
import AgGridReactComponent from '../components/AgGridReactComponent';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Plus, SquarePen, Trash } from 'lucide-react';
import { AgGridDeleteButton, AgGridEditButton, CsvButton, InsertButton } from '../components/ButtonComponent';
import { MenuType, SideMenuType } from '../layouts/BackOfficeLayout';
import useBackOfficeMenu from '../hooks/useBackOfficeMenu';
import { EditBoardModal, InsertBoardModal } from '../components/BackOfficeModal';
import type { AgGridReact } from 'ag-grid-react';
import useFormattedDate from '../hooks/useFormattedDate';
import type { ICellRendererParams } from 'ag-grid-community';
import { useAuth } from '../contexts/AuthContext';

export type Board = {
    id: number;
    categoryCode: string | null;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

const BackOfficeBoard = () => {

    const {accessToken} = useAuth();
    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.Board
        });
    }, []);

    const [isInsertModalOpen, setIsInsertModalOpenOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpenOpen] = useState(false);
    const [editModalData, SetEditModalData] = useState();


    const agGridComponentRef = useRef<AgGridReact>(null);

    const {formattedDate} = useFormattedDate();

    const [rowData, setRowData] = useState<Board[]>([
    ]);
    
    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true },
        { field: "categoryCode", headerName: "코드", filter: true },
        { field: "categoryName", headerName: "이름", filter: true },
        { field: "comment", headerName: "설명", filter: true },
        { field: "createdAt", headerName: "생성일", cellDataType: "dateTime", filter: true },
        { field: "updatedAt", headerName: "수정일", cellDataType: "dateTime", filter: true },
        {
            headerName: "관리",
            children: [
                {
                    colId: "edit",
                    headerName: "수정",
                    width: 60,
                    cellRenderer: (params: ICellRendererParams) => {
                        return <AgGridEditButton {...params} svg={<Trash color='white' size={16} strokeWidth={2} />} value='수정' type='button' onClick={(row) => onClickEdit(row)}></AgGridEditButton>
                    },
                },
                {
                    colId: "delete",
                    headerName: "삭제",
                    width: 60,
                    cellRenderer: (params: ICellRendererParams) => {
                        return <AgGridDeleteButton {...params} svg={<SquarePen color='white' size={16} strokeWidth={2} />} value='삭제' type='button' onClick={(row) => onClickDelete(row)}></AgGridDeleteButton>
                    },
                },
            ]
        },
    ]);

    const fetchBoards = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boards`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Board[]>;
        })
        .then(res => {
            let boards: Board[] = res.map(board => ({
                ...board,
                createdAt: board.createdAt ? new Date(board.createdAt) : null,
                updatedAt: board.updatedAt ? new Date(board.updatedAt) : null,
            }));

            setRowData(boards);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchBoards();
    }, [])

    const onClickEdit = (data: any) => {
        setIsEditModalOpenOpen(true);
        SetEditModalData(data);
    }

    const onClickDelete = (data: any) => {
        if(!confirm(`${data.categoryName} 게시판을 삭제하시겠습니까?`)) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/board/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            alert('게시판이 삭제되었습니다.');
            fetchBoards();
        })
        .catch(err => console.error(err));
    }
    
    return (
        <section className={`${styles.section}`}>
            <div className={styles.container}>
                <nav className={styles.breadcrumb} aria-label="breadcrumb">
                    <ol>
                        <li><Link to={'/backoffice'}>관리자</Link></li>
                        <ChevronRight size={16} color="black" strokeWidth={1} />
                        <li>게시판 관리</li>
                        <ChevronRight size={16} color="black" strokeWidth={1} />
                        <li aria-current="page">게시판 목록</li>
                    </ol>
                </nav>
                <div className={`${styles.buttonGroup}`}>
                    <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>}  value='추가' type='button' onClick={() => setIsInsertModalOpenOpen(true)}/>
                    <CsvButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={() => agGridComponentRef.current?.api.exportDataAsCsv({fileName: `게시판 목록 ${formattedDate}.csv`})}/>
                </div>
                <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
                <InsertBoardModal isOpen={isInsertModalOpen} setIsOpen={setIsInsertModalOpenOpen} fetchBoards={fetchBoards}></InsertBoardModal>
                <EditBoardModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpenOpen} fetchBoards={fetchBoards} data={editModalData}></EditBoardModal>
            </div>
        </section>
    )
}

export default BackOfficeBoard;