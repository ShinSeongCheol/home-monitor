import type {BackOfficeMemberRoleCode} from "../../model/type.ts";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import {useUpdateRoleCodeForm} from "../model/useUpdateRoleCodeForm.ts";

type UpdateUserRoleCodeFormProps = {
    fetchUserRoleCodes: () => Promise<void>;
    data: BackOfficeMemberRoleCode|undefined;
    handleClickCancel: () => void;
}

export const UpdateUserRoleCodeForm = ({fetchUserRoleCodes, data, handleClickCancel}: UpdateUserRoleCodeFormProps) => {

    if (!data) {
        handleClickCancel();
        return;
    }

    const {
        code,
        name,
        handleChangeCode,
        handleChangeName,
        handleClickSubmit
    } = useUpdateRoleCodeForm(data);

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchUserRoleCodes, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='code'>코드</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="code" value={code} maxLength={16} required onChange={handleChangeCode}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='name'>이름</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="name" name="name" value={name} maxLength={16} onChange={handleChangeName}/>
                </div>

            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='저장' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'사용자 권한 코드 수정'} content={'사용자 권한 코드를 수정합니다.'} cancel={handleClickCancel} children={form} />
    )
}