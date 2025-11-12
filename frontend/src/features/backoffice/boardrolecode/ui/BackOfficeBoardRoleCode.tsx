import {DeleteButton, EditButton, InsertButton, DownloadButton} from "../../../../shared/ui";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import AgGridReactComponent from "../../../../components/AgGridReactComponent.tsx";
import {useBackOfficeBoardRoleCode} from "../model/useBackOfficeBoardRoleCode.ts";
import {InsertBoardRoleCodeForm} from "./InsertBoardRoleCodeForm.tsx";
import {UpdateBoardRoleCodeForm} from "./UpdateBoardRoleCodeForm.tsx";

export const BackOfficeBoardRoleCode = () => {

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
        fetchBoardRoleCodes,
        handleClickDelete,
        handleClickDownload
    } = useBackOfficeBoardRoleCode();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
                {isInsertOpen && <InsertBoardRoleCodeForm fetchBoardRoleCodes={fetchBoardRoleCodes} handleClickCancel={()=> setIsInsertOpen(false)} />}

                <EditButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
                {isEditOpen && <UpdateBoardRoleCodeForm fetchBoardRoleCodes={fetchBoardRoleCodes} data={data} handleClickCancel={() => setIsEditOpen(false)} />}

                <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={handleClickDelete}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}