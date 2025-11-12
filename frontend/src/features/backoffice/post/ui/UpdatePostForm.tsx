import {CancelButton, CkEditor, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import {useUpdatePostForm} from "../model/useUpdatePostForm.ts";
import type {BackOfficePost} from "../../model/type.ts";

type UpdatePostProps = {
    fetchPosts: () => Promise<void>;
    data: BackOfficePost | undefined;
    handleClickCancel: () => void;
}

export const UpdatePostForm = ({fetchPosts, data, handleClickCancel } : UpdatePostProps) => {

    if(!data) {
        handleClickCancel();
        return;
    }

    const {
        boards,
        members,
        title,
        content,
        selectedBoardId,
        selectedMemberId,
        handleChangeBoardId,
        handleChangeMemberId,
        handleChangeTitle,
        setContent,
        handleClickSubmit
    } = useUpdatePostForm(data);

    const form = (

        <form className={'flex flex-col gap-4 w-5xl'} onSubmit={(e) => handleClickSubmit(e, fetchPosts, handleClickCancel)}>
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
                    <label className={'w-28 select-none'} htmlFor='author'>작성자</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='author' value={selectedMemberId} onChange={handleChangeMemberId}>
                        {members?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='title'>제목</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="title" name="title" value={title} maxLength={16} onChange={handleChangeTitle}/>
                </div>

                <div className={'max-h-[600px] overflow-auto'}>
                    <CkEditor data={content} handleChange={setContent}/>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'게시물 수정'} content={'게시물을 수정합니다.'} cancel={handleClickCancel} children={form} />
    )
}