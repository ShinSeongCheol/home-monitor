import {BackOfficeModalLayout} from "../../../../shared";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {useInsertReactionForm} from "../model/useInsertReactionForm.ts";

type InsertReactionFormProps = {
    fetchReactions: () => Promise<void>;
    handleClickCancel: () => void;
}

export const InsertReactionForm = ({fetchReactions, handleClickCancel}: InsertReactionFormProps) => {

    const {
        posts,
        selectedPostId,
        handleChangePostId,
        comments,
        selectedCommentId,
        handleChangeCommentId,
        members,
        selectedMemberId,
        handleChangeMemberId,
        reactionCodes,
        selectedReactionCodeId,
        handleChangeReactionCodeId,
        handleClickSubmit
    } = useInsertReactionForm();

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchReactions, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='post'>게시물</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='post' value={selectedPostId} onChange={handleChangePostId}>
                        {posts?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.title} ({value.id})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='comment'>댓글</label>
                    <option value=""></option>
                    <select className={'w-full flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='comment' value={selectedCommentId} onChange={handleChangeCommentId}>
                        <option key={""} value={""}>없음</option>
                        {comments?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.content} ({value.id})</option>
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
                    <label className={'w-28 select-none'} htmlFor='reactionCode'>반응 코드</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='reactionCode' value={selectedReactionCodeId} onChange={handleChangeReactionCodeId}>
                        {reactionCodes?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.name} ({value.code})</option>
                        })}
                    </select>
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