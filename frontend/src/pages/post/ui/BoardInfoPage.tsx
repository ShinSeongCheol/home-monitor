import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getBoard, type Board } from '../../../entities/board';
import {PostListWidget} from "../../../widgets/post";

export const BoardInfoPage = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [board, setBoard] = useState<Board>();
    const {user} = useAuth();

    const categoryCode = params.categoryCode;

    // 게시판 조회
    useEffect(() => {

        getBoard(categoryCode)
        .then(data => {
            setBoard(data);
        })
        .catch(err => console.error(err));


    }, [])

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('읽기 권한이 없습니다.');
            navigate(-1);
        }
    }, [board])

    return (
        <PostListWidget />
    )
}