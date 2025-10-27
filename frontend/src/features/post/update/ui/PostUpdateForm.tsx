import { CancleButton, CkEditor, InsertButton } from "../../../../shared/ui"
import { useUpdatePost } from "../model/useUpdatePost";

export const PostUpdateForm = () => {

    const {title, content, handleSubmit, handleTitleChange, setContent, handleCancel} = useUpdatePost();

    return (
        <form className='mt-4 flex flex-col gap-2' onSubmit={handleSubmit}>
            <input className='outline-0 text-lg' type="text" name="title" id="title" placeholder="제목을 입력하세요." maxLength={32} required value={title} onChange={handleTitleChange} />
            <hr />
            <CkEditor data={content} handleChange={(content) => setContent(content)} />
            <div className='flex justify-end gap-2'>
                <CancleButton svg={null} type='button' value='취소' onClick={handleCancel} />
                <InsertButton type='submit' value='저장'/>
            </div>
        </form>
    )
}