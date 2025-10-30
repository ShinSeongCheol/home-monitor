import {DeleteButton} from "../../../../shared/ui";
import {useDeletePostButton} from "../model/useDeletePostButton.ts";

export const DeletePostButton = () => {

    const {handleDelete} = useDeletePostButton();

    return (
        <DeleteButton svg={null} type='button' value='삭제' onClick={handleDelete}/>
    )
}