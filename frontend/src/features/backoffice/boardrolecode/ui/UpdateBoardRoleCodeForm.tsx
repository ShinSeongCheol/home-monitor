import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {useUpdateBoardRoleCodeForm} from "../model/useUpdateBoardRoleCodeForm.ts";
import type {BackOfficeBoardRoleCode} from "../../model/type.ts";

type UpdateBoardFormProps = {
    fetchBoardRoleCodes: () => Promise<void>;
    data: BackOfficeBoardRoleCode|undefined;
    handleClickCancel: () => void;
}

export const UpdateBoardRoleCodeForm = ({fetchBoardRoleCodes, data, handleClickCancel}: UpdateBoardFormProps) => {

    if(!data) {
        handleClickCancel()
        return;
    }

    const {code, name, handleChangeCode, handleChangeName, handleClickSubmit} = useUpdateBoardRoleCodeForm(data);

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchBoardRoleCodes, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='code'>코드</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="code" value={code} maxLength={16} required onChange={handleChangeCode}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='name'>이름</label>
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