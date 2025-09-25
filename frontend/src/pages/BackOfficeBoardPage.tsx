import styles from '../styles/pages/BackOfficeBoardPage.module.css';
import AgGridReactComponent from '../components/AgGridReactComponent';
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AgGridDeleteButton, AgGridEditButton, CsvButton, InsertButton } from '../components/ButtonComponent';
import { MenuType, SideMenuType } from '../layouts/BackOfficeLayout';
import useBackOfficeMenu from '../hooks/useBackOfficeMenu';

type Board = {
    id: number;
    categoryCode: string | null;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

type ContextType = {
    setOpenMenu : React.Dispatch<React.SetStateAction<string>>;
    setOpenSideMenu :React.Dispatch<React.SetStateAction<string>>;
}

const BackOfficeBoard = () => {

    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.Board
        });
    }, []);

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
                headerName: "수정",   // 하위 컬럼 이름
                width: 60,
                cellRenderer: AgGridEditButton,
                },
                {
                colId: "delete",
                headerName: "삭제",
                width: 60,
                cellRenderer: AgGridDeleteButton,
                },
            ]
        },
    ]);

    useEffect(() => {
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
    }, [])
    
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
                    <InsertButton value='추가' onClick={() => console.log('click')}/>
                    <CsvButton value='CSV' onClick={() => console.log('click')}/>
                </div>
                <AgGridReactComponent colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
            </div>
        </section>
    )
}

export default BackOfficeBoard;