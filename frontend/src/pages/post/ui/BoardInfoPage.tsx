import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useAuth} from '../../../contexts/AuthContext';
import {useBoardInfo} from '../../../entities/board';
import {PostListWidget} from "../../../widgets/post";

export const BoardInfoPage = () => {

    const navigate = useNavigate();

    const {user} = useAuth();
    const {board} = useBoardInfo();

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if (!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('읽기 권한이 없습니다.');
            navigate(-1);
        }
    }, [board])

    return (
        <PostListWidget/>
    )
}