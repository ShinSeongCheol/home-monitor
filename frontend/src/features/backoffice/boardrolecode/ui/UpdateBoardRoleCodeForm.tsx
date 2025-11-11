import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import type {AgGridReact} from "ag-grid-react";
import {useUpdateBoardRoleCodeForm} from "../model/useUpdateBoardRoleCodeForm.ts";

type UpdateBoardFormProps = {
    fetchBoardRoleCodes: () => Promise<void>;
    agGridReact: AgGridReact | null;
    handleClickCancel: () => void;
}

export const UpdateBoardRoleCodeForm = ({fetchBoardRoleCodes, agGridReact, handleClickCancel}: UpdateBoardFormProps) => {

    const {code, name, handleChangeCode, handleChangeName, handleClickSubmit} = useUpdateBoardRoleCodeForm(agGridReact);

    const form = (
        <form className={'flex flex-col gap-4'} onSubmit={(e) => handleClickSubmit(e, fetchBoardRoleCodes, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='code'>코드</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="code" value={code} maxLength={16} required onChange={handleChangeCode}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='name'>이름</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="name" name="name" value={name ?? ""} maxLength={16} onChange={handleChangeName}/>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit'></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'게시판 권한 코드 수정'} content={'게시판 권한 코드을 수정합니다.'} cancel={handleClickCancel} children={form} />
    )
}