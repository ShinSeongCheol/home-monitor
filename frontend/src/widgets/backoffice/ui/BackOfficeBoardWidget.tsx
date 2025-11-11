import {Nav} from "../../../features/backoffice";
import {BackOfficeBoard} from "../../../features/backoffice/board";

export const BackOfficeBoardWidget = () => {

    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'게시판 목록'}/>
                <BackOfficeBoard />
            </div>

            {/*<div className={'styles.container'}>*/}
            {/*    <div className={`styles.buttonGroup`}>*/}
            {/*        <InsertButton svg={<Plus color='white' size={16} strokeWidth={2}/>} value='추가' type='button'*/}
            {/*                      onClick={() => setIsInsertModalOpenOpen(true)}/>*/}
            {/*        <UpdateButton svg={<SquarePen color='white' size={16} strokeWidth={2}/>} value='수정' type='button'*/}
            {/*                      onClick={() => onClickEdit()}/>*/}
            {/*        <DeleteButton svg={<Trash color='white' size={16} strokeWidth={2}/>} value='삭제' type='button'*/}
            {/*                      onClick={() => onClickDelete()}/>*/}
            {/*        <CsvButton svg={<Download color='white' size={16} strokeWidth={2}/>} value='CSV' type='button'*/}
            {/*                   onClick={() => agGridComponentRef.current?.api.exportDataAsCsv({fileName: `게시판 목록 ${formattedDate}.csv`})}/>*/}
            {/*    </div>*/}
            {/*    <AgGridReactComponent ref={agGridComponentRef} colDefs={colDefs}*/}
            {/*                          rowData={rowData}></AgGridReactComponent>*/}
            {/*    <InsertBoardModal isOpen={isInsertModalOpen} setIsOpen={setIsInsertModalOpenOpen}*/}
            {/*                      fetchData={fetchData}></InsertBoardModal>*/}
            {/*    <EditBoardModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpenOpen} fetchData={fetchData}*/}
            {/*                    data={editModalData}></EditBoardModal>*/}
            {/*</div>*/}
        </section>
    )
}