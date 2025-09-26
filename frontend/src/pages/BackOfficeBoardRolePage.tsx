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
import type { BoardRole } from './BackOfficeBoardPage';

const BackOfficeBoardRole = () => {

    const {accessToken} = useAuth();
    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.BoardRole
        });
    }, []);

    const [isInsertModalOpen, setIsInsertModalOpenOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpenOpen] = useState(false);
    const [editModalData, SetEditModalData] = useState();


    const agGridComponentRef = useRef<AgGridReact>(null);

    const {formattedDate} = useFormattedDate();

    const [rowData, setRowData] = useState<BoardRole[]>([
    ]);
    
    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:2, },
        {
            headerName: "게시판",
            children: [
                {
                    colId: "board_category_code",
                    headerName: "코드",
                    field: "board.categoryCode",
                    flex:2,
                },
                {
                    colId: "board_category_name",
                    headerName: "이름",
                    field: "board.categoryCode",
                    flex:2,
                },
                {
                    colId: "board_comment",
                    headerName: "설명",
                    field: "board.comment",
                    flex:2,
                },
            ]
        },
        {
            headerName: "게시판 권한 코드",
            children: [
                {
                    colId: "board_role_code_code",
                    headerName: "코드",
                    field: "boardRoleCode.code",
                    flex:2,
                },
                {
                    colId: "board_role_code_name",
                    headerName: "이름",
                    field: "boardRoleCode.name",
                    flex:2,
                },
            ]
        },
                {
            headerName: "사용자 권한 코드",
            children: [
                {
                    colId: "member_role_code_code",
                    headerName: "코드",
                    field: "memberRoleCode.code",
                    flex:2,
                },
                {
                    colId: "member_role_code_name",
                    headerName: "이름",
                    field: "memberRoleCode.name",
                    flex:2,
                },
            ]
        },
        {
            headerName: "관리",
            children: [
                {
                    colId: "edit",
                    headerName: "수정",
                    width:160,
                    cellRenderer: (params: ICellRendererParams) => {
                        return <AgGridEditButton {...params} svg={<SquarePen color='white' size={16} strokeWidth={2} />} value='수정' type='button' onClick={(row) => onClickEdit(row)}></AgGridEditButton>
                    },
                },
                {
                    colId: "delete",
                    headerName: "삭제",
                    width:160,
                    cellRenderer: (params: ICellRendererParams) => {
                        return <AgGridDeleteButton {...params} svg={<Trash color='white' size={16} strokeWidth={2} />} value='삭제' type='button' onClick={(row) => onClickDelete(row)}></AgGridDeleteButton>
                    },
                },
            ]
        },
    ]);

    const fetchBoards = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRole`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<BoardRole[]>;
        })
        .then(res => {
            setRowData(res);
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
                        <li aria-current="page">게시판 권한</li>
                    </ol>
                </nav>
                <div className={`${styles.buttonGroup}`}>
                    <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>}  value='추가' type='button' onClick={() => setIsInsertModalOpenOpen(true)}/>
                    <CsvButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={() => agGridComponentRef.current?.api.exportDataAsCsv({fileName: `게시판 목록 ${formattedDate}.csv`})}/>
                </div>
                <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
                <InsertBoardModal isOpen={isInsertModalOpen} setIsOpen={setIsInsertModalOpenOpen} fetchData={fetchBoards}></InsertBoardModal>
                <EditBoardModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpenOpen} fetchData={fetchBoards} data={editModalData}></EditBoardModal>
            </div>
        </section>
    )
}

export default BackOfficeBoardRole;