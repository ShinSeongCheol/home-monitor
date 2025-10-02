import styles from '../styles/pages/BackOfficeBoardPage.module.css';
import AgGridReactComponent from '../components/AgGridReactComponent';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Plus, SquarePen, Trash } from 'lucide-react';
import { CsvButton, DeleteButton, InsertButton, UpdateButton, } from '../components/ButtonComponent';
import { MenuType, SideMenuType, type ReactionCode } from '../layouts/BackOfficeLayout';
import useBackOfficeMenu from '../hooks/useBackOfficeMenu';
import type { AgGridReact } from 'ag-grid-react';
import useFormattedDate from '../hooks/useFormattedDate';
import { useAuth } from '../contexts/AuthContext';
import { EditReactionCodeModal, InsertReactionCodeModal } from '../components/BackOfficeModal';

const BackOfficeReactionCodePage = () => {

    const {accessToken} = useAuth();
    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.ReactionCode
        });
    }, []);

    const [isInsertModalOpen, setIsInsertModalOpenOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpenOpen] = useState(false);
    const [editModalData, SetEditModalData] = useState();

    
    const agGridComponentRef = useRef<AgGridReact>(null);
    
    const {formattedDate} = useFormattedDate();
    
    const [rowData, setRowData] = useState<ReactionCode[]>([
    ]);
    
    const [colDefs] = useState([
        { field: "id", headerName: "ID", filter: true, flex:1, },
        { field: "code", headerName: "코드", filter: true, flex:1, },
        { field: "name", headerName: "이름", filter: true, flex:1, },
    ]);

    const fetchData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactionCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<ReactionCode[]>;
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
        if (rows.length === 0) return ;
        const data = rows[0];

        setIsEditModalOpenOpen(true);
        SetEditModalData(data);
    }

    const onClickDelete = () => {
        const ref = agGridComponentRef.current;
        if (!ref) return;

        const rows = ref.api.getSelectedRows();
        if (rows.length === 0) return ;
        const data = rows[0];

        if(!confirm(`${data.id}번 반응을 삭제하시겠습니까?`)) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactionCodes/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            alert('댓글이 삭제되었습니다.');
            fetchData();
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
                        <li aria-current="page">반응 코드</li>
                    </ol>
                </nav>
                <div className={`${styles.buttonGroup}`}>
                    <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>}  value='추가' type='button' onClick={() => setIsInsertModalOpenOpen(true)}/>
                    <UpdateButton svg={<SquarePen color='white' size={16} strokeWidth={2} />} value='수정' type='button' onClick={() => onClickEdit()} />
                    <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2} />} value='삭제' type='button' onClick={() => onClickDelete()}/>
                    <CsvButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={() => agGridComponentRef.current?.api.exportDataAsCsv({fileName: `반응 목록 ${formattedDate}.csv`})}/>
                </div>
                <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
                <InsertReactionCodeModal isOpen={isInsertModalOpen} setIsOpen={setIsInsertModalOpenOpen} fetchData={fetchData}/>
                <EditReactionCodeModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpenOpen} fetchData={fetchData} data={editModalData}/>
            </div>
        </section>
    )
}

export default BackOfficeReactionCodePage;