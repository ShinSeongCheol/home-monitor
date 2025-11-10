import {DeleteButton, InsertButton} from "../../../../shared/ui";
import {Plus, SquarePen} from "lucide-react";
import {CancleButton, UpdateButton} from "../../../../components/ButtonComponent.tsx";
import {useBackOfficeBoard} from "../model/useBackOfficeBoard.ts";
import AgGridReactComponent from "../../../../components/AgGridReactComponent.tsx";
import {InsertBoardForm} from "./InsertBoardForm.tsx";
import {UpdateBoardForm} from "./UpdateBoardForm.tsx";

export const BackOfficeBoard = () => {

    const {isInsertOpen, setIsInsertOpen, isEditOpen, setIsEditOpen, agGridComponentRef, colDefs, rowData, fetchBoard} = useBackOfficeBoard();

    return (
        <>
            <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
            {isInsertOpen && <InsertBoardForm fetchBoard={fetchBoard} handleClickCancel={()=> setIsInsertOpen(false)} />}

            <UpdateButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
            {isEditOpen && <UpdateBoardForm fetchBoard={fetchBoard} agGridReact={agGridComponentRef.current} handleClickCancel={() => setIsEditOpen(false)} />}
            {/*<DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={() => onClickDelete()}/>*/}
            {/*<CsvButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={() => agGridComponentRef.current?.api.exportDataAsCsv({fileName: `게시판 목록 ${formattedDate}.csv`})}/>*/}

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
        </>
    )
}