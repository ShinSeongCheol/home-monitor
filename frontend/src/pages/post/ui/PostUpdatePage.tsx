import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import type { Board } from '../../../entities/Board';
import { PostUpdateForm } from '../../../features/post/update/ui/PostUpdateForm';

export const PostUpdatePage = () => {

    const {user} = useAuth();

    const navigate = useNavigate();
    const {categoryCode, postId} = useParams();
    const [board, setBoard] = useState<Board>();

    useEffect(() => {
        fetch((`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}`), {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(data => {
            setBoard(data.board);
        })
        .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'MODIFY' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('수정 권한이 없습니다.');
            navigate(-1);
        };
    }, [board])

    return(
        <main className={'w-full h-full flex justify-center'}>
            <section className={'w-full lg:w-5xl h-full'}>
                <PostUpdateForm/>
            </section>
        </main>
    )
}