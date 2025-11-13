import {DeleteButton, DownloadButton, EditButton, InsertButton} from "../../../../shared/ui";
import {Download, Plus, SquarePen, Trash} from "lucide-react";
import AgGridReactComponent from "../../../../components/AgGridReactComponent.tsx";
import {useBackOfficeReaction} from "../model/useBackOfficeReaction.ts";
import {InsertReactionForm} from "./InsertReactionForm.tsx";
import {UpdateReactionForm} from "./UpdateReactionForm.tsx";

export const BackOfficeReaction = () => {

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
        fetchReactions,
        handleClickDelete,
        handleClickDownload
    } = useBackOfficeReaction();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value={"추가"} type={"button"} onClick={() => setIsInsertOpen(true)}/>
                {isInsertOpen && <InsertReactionForm fetchReactions={fetchReactions} handleClickCancel={()=> setIsInsertOpen(false)} />}

                <EditButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button' onClick={() => setIsEditOpen(true)}/>
                {isEditOpen && <UpdateReactionForm fetchReactions={fetchReactions} data={data} handleClickCancel={() => setIsEditOpen(false)} />}

                <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button' onClick={handleClickDelete}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}