import {DeleteButton, DownloadButton, EditButton, InsertButton} from "../../../../shared/ui";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import AgGridReactComponent from "../../../../components/AgGridReactComponent.tsx";
import {useBackOfficeReactionCode} from "../model/useBackOfficeReactionCode.ts";
import {InsertReactionCodeForm} from "./InsertReactionCodeForm.tsx";
import {UpdateReactionCodeForm} from "./UpdateReactionCodeForm.tsx";

export const BackOfficeReactionCode = () => {

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
        fetchReactionCodes,
        handleClickDelete,
        handleClickDownload
    } = useBackOfficeReactionCode();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
                {isInsertOpen && <InsertReactionCodeForm fetchReactionCodes={fetchReactionCodes} handleClickCancel={()=> setIsInsertOpen(false)} />}

                <EditButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
                {isEditOpen && <UpdateReactionCodeForm fetchReactionCodes={fetchReactionCodes} data={data} handleClickCancel={() => setIsEditOpen(false)} />}

                <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={handleClickDelete}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}