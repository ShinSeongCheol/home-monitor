import AgGridReactComponent from "../../../../shared/ui/AgGridReactComponent.tsx";
import {DeleteButton, DownloadButton, EditButton, InsertButton} from "../../../../shared/ui";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import {useBackOfficeBoardRole} from "../model/useBackOfficeBoardRole.ts";
import {InsertBoardRoleForm} from "./InsertBoardRoleForm.tsx";
import {UpdateBoardRoleForm} from "./UpdateBoardRoleForm.tsx";

export const BackOfficeBoardRole = () => {

    const {isInsertOpen, isEditOpen, agGridComponentRef, colDefs, rowData, data, setData, setIsInsertOpen, setIsEditOpen, handleClickDelete, handleClickDownload, fetchBoardRoles} = useBackOfficeBoardRole();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
                {isInsertOpen && <InsertBoardRoleForm fetchBoardRoles={fetchBoardRoles} handleClickCancel={()=> setIsInsertOpen(false)} />}

                <EditButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
                {isEditOpen && <UpdateBoardRoleForm fetchBoardRoles={fetchBoardRoles} data={data} handleClickCancel={() => setIsEditOpen(false)} />}

                <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={handleClickDelete}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>
            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}