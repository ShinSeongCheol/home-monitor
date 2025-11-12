import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import type {AgGridReact} from "ag-grid-react";
import {useUpdateBoardForm} from "../model/useUpdateBoardForm.ts";

type UpdateBoardFormProps = {
    fetchBoard: () => Promise<void>;
    agGridReact: AgGridReact | null;
    handleClickCancel: () => void;
}

export const UpdateBoardForm = ({fetchBoard, agGridReact, handleClickCancel}: UpdateBoardFormProps) => {

    const {code, name, comment, handleChangeCode, handleChangeName, handleChangeComment, handleClickSubmit} = useUpdateBoardForm(agGridReact);

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchBoard, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='code'>코드</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="code" value={code} maxLength={16} required onChange={handleChangeCode}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='name'>이름</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="name" name="name" value={name ?? ""} maxLength={16} onChange={handleChangeName}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='comment'>설명</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="comment" name="comment" value={comment ?? ""} maxLength={32} onChange={handleChangeComment}/>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit'></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'게시판 수정'} content={'게시판을 수정합니다.'} cancel={handleClickCancel} children={form} />
    )
}