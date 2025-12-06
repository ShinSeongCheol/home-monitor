import {EditButton} from "../../../../shared/ui";
import {useUpdatePostButton} from "../model/useUpdatePostButton.ts";

export const UpdatePostButton = () => {

    const {handleUpdate} = useUpdatePostButton();

    return (
        <EditButton svg={null} type='button' value='수정' onClick={handleUpdate} />
    )
}