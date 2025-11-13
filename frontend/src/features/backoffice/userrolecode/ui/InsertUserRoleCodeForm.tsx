import {CancelButton, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import {useInsertRoleCodeForm} from "../model/useInsertRoleCodeForm.ts";

type InsertUserRoleCodeFormProps = {
    fetchUserRoleCodes: () => Promise<void>;
    handleClickCancel: () => void;
}

export const InsertUserRoleCodeForm = ({fetchUserRoleCodes, handleClickCancel}:InsertUserRoleCodeFormProps) => {

    const {
        code,
        name,
        handleChangeCode,
        handleChangeName,
        handleClickSubmit
    } = useInsertRoleCodeForm();

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
                <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'사용자 권한 코드 추가'} content={'새로운 사용자 권한 코드를 추가합니다.'} cancel={handleClickCancel} children={form} />
    )
}