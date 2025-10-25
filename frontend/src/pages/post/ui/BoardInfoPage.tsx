import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getBoard, type Board, BoardInfo } from '../../../entities/board';
import { InsertButton, CancleButton } from '../../../shared/ui';

export const BoardInfoPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
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
        };
    }, [board])

    return (
        <main className='w-full flex justify-center'>
            <section className='w-full md:w-5xl p-2 md:p-0'>
                
                <BoardInfo categoryCode={categoryCode} />

                <div className='flex justify-end py-2 gap-2'>
                    <CancleButton svg={null} type='button' value='뒤로가기' onClick={() => navigate(-1)}/>
                    {
                    board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'WRITE' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))
                        ?
                        <InsertButton svg={null} type='button' value='글쓰기' onClick={() => navigate(`${location.pathname}/post`)}/>
                        :
                        ""
                    }
                </div>
            </section>
        </main>
    )
}