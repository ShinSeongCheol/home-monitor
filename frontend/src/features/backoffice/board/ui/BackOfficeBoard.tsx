import {DeleteButton, EditButton, InsertButton, DownloadButton} from "../../../../shared/ui";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import {useBackOfficeBoard} from "../model/useBackOfficeBoard.ts";
import AgGridReactComponent from "../../../../components/AgGridReactComponent.tsx";
import {InsertBoardForm} from "./InsertBoardForm.tsx";
import {UpdateBoardForm} from "./UpdateBoardForm.tsx";

export const BackOfficeBoard = () => {

    const {isInsertOpen, setIsInsertOpen, isEditOpen, setIsEditOpen, agGridComponentRef, colDefs, rowData, data, setData, fetchBoard, handleClickDelete, handleClickDownload} = useBackOfficeBoard();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
                {isInsertOpen && <InsertBoardForm fetchBoard={fetchBoard} handleClickCancel={()=> setIsInsertOpen(false)} />}

                <EditButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
                {isEditOpen && <UpdateBoardForm fetchBoard={fetchBoard} data={data} handleClickCancel={() => setIsEditOpen(false)} />}

                <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={handleClickDelete}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}