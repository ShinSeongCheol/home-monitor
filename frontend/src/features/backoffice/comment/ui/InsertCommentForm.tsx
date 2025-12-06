import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {useInsertCommentForm} from "../model/useInsertCommentForm.ts";

type InsertCommentFormProps = {
    fetchComments: () => Promise<void>;
    handleClickCancel: () => void;
}

export const InsertCommentForm = ({fetchComments, handleClickCancel}: InsertCommentFormProps) => {

    const {
        posts,
        members,
        content,
        parentComments,
        selectedPostId,
        selectedMemberId,
        selectedParentCommentId,
        handleChangePostId,
        handleChangeMemberId,
        handleChangeParentCommentId,
        handleChangeContent,
        handleClickSubmit
    } = useInsertCommentForm();

    const form = (

        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchComments, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>
                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='post'>게시물</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='post' value={selectedPostId} onChange={handleChangePostId}>
                        {posts?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.id} ({value.title})</option>
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
                    <label className={'w-28 select-none'} htmlFor='parentComment'>부모 댓글 ID</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='parentComment' value={selectedParentCommentId} onChange={handleChangeParentCommentId}>
                        <option value="">{`없음 (${parentComments?.length ?? 0} 개)`}</option>
                        {parentComments?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.id}</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='content'>내용</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="content" name="content" value={content} maxLength={128} onChange={handleChangeContent}/>
                </div>
            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'댓글 추가'} content={'새로운 댓글을 추가합니다.'} cancel={handleClickCancel} children={form} />
    )
}