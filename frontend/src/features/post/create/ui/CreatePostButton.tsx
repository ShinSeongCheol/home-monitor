import {InsertButton} from "../../../../shared/ui";
import {useCreatePostButton} from "../model/useCreatePostButton.ts";

export const CreatePostButton = () => {

    const {user, board, handleInsert} = useCreatePostButton();

    // 게시판 유저권한별 쓰기 권한이 있어야지만 쓰기 버튼이 보임
    if (!board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'WRITE' && user?.authorities.includes(boardRole.memberRoleCode?.code ?? ""))) return ;

    return (
        <InsertButton svg={null} type='button' value='글쓰기' onClick={handleInsert}/>
    )
}