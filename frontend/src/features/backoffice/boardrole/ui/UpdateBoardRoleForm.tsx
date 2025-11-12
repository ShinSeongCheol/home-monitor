import {CancelButton, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import type {AgGridReact} from "ag-grid-react";
import {useUpdateBoardRoleForm} from "../model/useUpdateBoardRoleForm.ts";

type UpdateBoardRoleFormProps = {
    fetchBoardRoles: () => Promise<void>;
    agGridReact: AgGridReact | null;
    handleClickCancel: () => void;
}

export const UpdateBoardRoleForm = ({fetchBoardRoles, agGridReact, handleClickCancel} : UpdateBoardRoleFormProps) => {
    const {
        boards,
        boardRoleCodes,
        memberRoleCodes,
        selectedBoardId,
        handleChangeBoardId,
        selectedBoardRoleCodeId,
        handleChangeBoardRoleCodeId,
        selectedMemberRoleCodeId,
        handleChangeMemberRoleCodeId,
        handleClickSubmit
    } = useUpdateBoardRoleForm(agGridReact);

    const form = (

        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchBoardRoles, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='board'>게시판</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='board' value={selectedBoardId} onChange={handleChangeBoardId}>
                        {boards?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.categoryCode} ({value.categoryName})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='boardRoleCode'>게시판 권한</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='boardRoleCode' value={selectedBoardRoleCodeId} onChange={handleChangeBoardRoleCodeId}>
                        {boardRoleCodes?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='memberRoleCode'>사용자 권한</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='memberRoleCode' value={selectedMemberRoleCodeId} onChange={handleChangeMemberRoleCodeId}>
                        <option>전체</option>
                        {memberRoleCodes?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                        })}
                    </select>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'게시판 권한 수정'} content={'게시판 권한을 수정합니다.'} cancel={handleClickCancel} children={form} />
    )
}