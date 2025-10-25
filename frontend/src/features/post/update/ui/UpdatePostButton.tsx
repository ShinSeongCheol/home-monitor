import {EditButton} from "../../../../shared/ui";
import {useUpdatePostButton} from "../model/useUpdatePostButton.ts";
import type {Post} from "../../../../entities/post";

type UpdatePostButtonProps = {
    post: Post|undefined;
}

export const UpdatePostButton = ({post}: UpdatePostButtonProps) => {

    const {user, board, handleUpdate} = useUpdatePostButton();

    // 게시판과 유저의 권한이 일치해야 수정 버튼이 보임
    if (user?.email !== post?.member.email) return ;

    // 게시판 유저권한별 수정 권한이 있어야지만 수정 버튼이 보임
    if (!board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'MODIFY' && user?.authorities.includes(boardRole.memberRoleCode?.code ?? ""))) return ;

    return (
        <EditButton svg={null} type='button' value='수정' onClick={handleUpdate} />
    )
}