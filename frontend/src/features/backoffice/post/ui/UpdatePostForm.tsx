import {CancelButton, CkEditor, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import type {AgGridReact} from "ag-grid-react";
import {useUpdatePostForm} from "../model/useUpdatePostForm.ts";

type UpdatePostProps = {
    fetchPosts: () => Promise<void>;
    agGridReact: AgGridReact | null;
    handleClickCancel: () => void;
}

export const UpdatePostForm = ({fetchPosts, agGridReact, handleClickCancel} : UpdatePostProps) => {
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
    } = useUpdatePostForm(agGridReact);

    const form = (

        <form className={'flex flex-col gap-4'} onSubmit={(e) => handleClickSubmit(e, fetchPosts, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='board'>게시판</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='board' value={selectedBoardId} onChange={handleChangeBoardId}>
                        {boards?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.categoryCode} ({value.categoryName})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='author'>작성자</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='author' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                        {members?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 text-center select-none'} htmlFor='title'>제목</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="title" name="title" value={title} maxLength={16} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <CkEditor data={content} handleChange={setContent}/>

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