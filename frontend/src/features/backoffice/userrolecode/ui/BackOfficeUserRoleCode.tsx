import {DeleteButton, DownloadButton, EditButton, InsertButton} from "../../../../shared/ui";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import AgGridReactComponent from "../../../../shared/ui/AgGridReactComponent.tsx";
import {InsertUserRoleCodeForm} from "./InsertUserRoleCodeForm.tsx";
import {UpdateUserRoleCodeForm} from "./UpdateUserRoleCodeForm.tsx";
import {useBackOfficeUserRoleCode} from "../model/useBackOfficeUserRoleCode.ts";

export const BackOfficeUserRoleCode = () => {

    const {
        isInsertOpen,
        setIsInsertOpen,
        isEditOpen,
        setIsEditOpen,
        agGridComponentRef,
        colDefs,
        rowData,
        data,
        setData,
        fetchUserRoleCodes,
        handleClickDelete,
        handleClickDownload
    } = useBackOfficeUserRoleCode();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
                {isInsertOpen && <InsertUserRoleCodeForm fetchUserRoleCodes={fetchUserRoleCodes} handleClickCancel={()=> setIsInsertOpen(false)} />}

                <EditButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
                {isEditOpen && <UpdateUserRoleCodeForm fetchUserRoleCodes={fetchUserRoleCodes} data={data} handleClickCancel={() => setIsEditOpen(false)} />}

                <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={handleClickDelete}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}