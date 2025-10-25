import {DeleteButton} from "../../../../shared/ui";
import {useDeletePostButton} from "../model/useDeletePostButton.ts";
import type {Post} from "../../../../entities/post";

type DeletePostButtonProps = {
    post: Post|undefined
}

export const DeletePostButton = ({post}: DeletePostButtonProps) => {

    const {user, board, handleDelete} = useDeletePostButton();

    // 게시판과 유저의 권한이 일치해야 삭제 버튼이 보임
    if (user?.email !== post?.member.email) return ;
    
    // 게시판 유저권한별 삭제 권한이 있어야지만 삭제버튼이 보임
    if (!board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'DELETE' && user?.authorities.includes(boardRole.memberRoleCode?.code ?? ""))) return ;
    
    return (
        <DeleteButton svg={null} type='button' value='삭제' onClick={handleDelete}/>
    )
}