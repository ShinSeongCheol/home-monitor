import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {useInsertBoardForm} from "../model/useInsertBoardForm.ts";

type InsertBoardFormProps = {
    fetchBoard: () => Promise<void>;
    handleClickCancel: () => void;
}

export const InsertBoardForm = ({fetchBoard, handleClickCancel}: InsertBoardFormProps) => {

    const {code, name, comment, handleChangeCode, handleChangeName, handleChangeComment, handleClickSubmit} = useInsertBoardForm();

    const form = (
        <form className={'flex flex-col gap-4'} onSubmit={(e) => handleClickSubmit(e, fetchBoard)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='code'>코드</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="code" value={code} maxLength={16} required onChange={handleChangeCode}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='name'>이름</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="name" name="name" value={name} maxLength={16} onChange={handleChangeName}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='comment'>설명</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="comment" name="comment" value={comment} maxLength={32} onChange={handleChangeComment}/>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit'></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'게시판 추가'} content={'새로운 게시판을 추가합니다.'} cancel={handleClickCancel} children={form} />
    )
}