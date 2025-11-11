import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {useInsertBoardRoleCodeForm} from "../model/useInsertBoardRoleCodeForm.ts";

type InsertBoardFormProps = {
    fetchBoardRoleCodes: () => Promise<void>;
    handleClickCancel: () => void;
}

export const InsertBoardRoleCodeForm = ({fetchBoardRoleCodes, handleClickCancel}: InsertBoardFormProps) => {

    const {code, name, handleChangeCode, handleChangeName, handleClickSubmit} = useInsertBoardRoleCodeForm();

    const form = (
        <form className={'flex flex-col gap-4'} onSubmit={(e) => handleClickSubmit(e, fetchBoardRoleCodes, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='code'>코드</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="code" value={code} maxLength={16} required onChange={handleChangeCode}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='name'>이름</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="name" name="name" value={name} maxLength={16} onChange={handleChangeName}/>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit'></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'게시판 권한 코드 추가'} content={'새로운 게시판 권한 코드을 추가합니다.'} cancel={handleClickCancel} children={form} />
    )
}