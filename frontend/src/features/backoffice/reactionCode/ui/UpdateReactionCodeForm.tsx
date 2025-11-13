import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import type {BackOfficeReactionCode} from "../../model/type.ts";
import {useUpdateReactionCodeForm} from "../model/useUpdateReactionCodeForm.ts";

type InsertReactionFormProps = {
    fetchReactionCodes: () => Promise<void>;
    data: BackOfficeReactionCode | undefined;
    handleClickCancel: () => void;
}

export const UpdateReactionCodeForm = ({fetchReactionCodes, data, handleClickCancel}: InsertReactionFormProps) => {

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
    } = useUpdateReactionCodeForm(data);

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchReactionCodes, handleClickCancel)}>
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
        <BackOfficeModalLayout title={'반응 추가'} content={'새로운 반응을 추가합니다.'} cancel={handleClickCancel} children={form} />
    )
}