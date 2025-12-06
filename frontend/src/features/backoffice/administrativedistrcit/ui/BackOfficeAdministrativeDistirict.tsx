import {DownloadButton, InsertButton} from "../../../../shared/ui";
import {Download, Upload, File} from "lucide-react";
import AgGridReactComponent from "../../../../shared/ui/AgGridReactComponent.tsx";
import {FileDownloadButton} from "../../../../shared/ui/Button.tsx";
import {useBackOfficeAdministrativeDistrict} from "../model/useBackOfficeAdministrativeDistrict.ts";

export const BackOfficeAdministrativeDistrict = () => {

    const {
        agGridComponentRef,
        colDefs,
        rowData,
        setData,
        handleChangeFile,
        handleClickDownload,
        handleClickInsert
    } = useBackOfficeAdministrativeDistrict();

    return (
        <>
            <div className={'flex justify-end gap-1'}>
                <FileDownloadButton svg={<File color='white' size={16} strokeWidth={2}/>} value='불러오기' type='file' onChange={handleChangeFile}/>
                <InsertButton svg={<Upload size={16} color="white" fill="white" strokeWidth={1} />}  value='업로드' type='submit' onClick={handleClickInsert}/>
                <DownloadButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button' onClick={handleClickDownload}/>
            </div>

            <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs} rowData={rowData} setData={setData}></AgGridReactComponent>
        </>
    )
}