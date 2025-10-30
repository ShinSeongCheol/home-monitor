import {InsertButton} from "../../../../shared/ui";
import {useCreatePostButton} from "../model/useCreatePostButton.ts";

export const CreatePostButton = () => {

    const {handleInsert} = useCreatePostButton();

    return (
        <InsertButton svg={null} type='button' value='글쓰기' onClick={handleInsert}/>
    )
}