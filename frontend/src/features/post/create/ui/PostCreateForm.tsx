import {CancelButton, CkEditor, InsertButton} from "../../../../shared/ui";
import {usePostCreate} from "../model/usePostCreate";

export const PostCreateForm = () => {

    const {title, content, handleSubmit, handleTitleChange, setContent, goBack} = usePostCreate();


    return (
        <form className='flex flex-col gap-2 mt-4' onSubmit={handleSubmit}>
            <input className='outline-0 text-lg' type="text" name="title" id="title" placeholder="제목을 입력하세요."
                   maxLength={32} required value={title} onChange={handleTitleChange}/>

            <hr/>

            <CkEditor data={content} handleChange={(content) => setContent(content)}/>

            <div className='flex justify-end gap-2'>
                <CancelButton type='button' value='목록' onClick={goBack}/>
                <InsertButton type='submit' value='등록'/>
            </div>
        </form>
    )
}