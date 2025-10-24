import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';
import { useAuth } from '../../../contexts/AuthContext';
import { CancleButton, DeleteButton, InsertButton } from '../../../components/ButtonComponent';
import type { Board } from '../../../entities/Board';
import { PostDetail } from '../../../entities/post';
import { usePostDetail } from '../../../entities/post/model/usePostDetail';
import { PostReaction } from '../../../features/reaction';
import {Comment} from '../../../widgets/Comment';

export type PostComment = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    member: {
        email: string;
        nickname: string;
    };
    children_comment: PostComment[]
}

export type Reaction = {
    member: {
        email: string;
        nickname: string;
    },
    reactionCode: {
        code: string;
        name: string;
    }
}

export const PostDetailPage = () => {

    const {user, accessToken} = useAuth();

    const {post} = usePostDetail();

    const [memberEmail, setMemberEmail] = useState("");
    const [board, setBoard] = useState<Board>();

    const {categoryCode, postId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const boardRoles = board?.boardRoles;
        if (!boardRoles) return;

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('읽기 권한이 없습니다.');
            navigate(-1);
        };
    }, [board])

    const handleEdit = () => {
        if(!confirm('글을 수정하시겠습니까?')) return;
        navigate(`${location.pathname}/edit`);
    }

    const handleDelete = () => {
        if(!confirm('글을 삭제하시겠습니까?')) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then((res) =>{
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            alert('글이 삭제되었습니다.');
            navigate(-1);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return(
        <main className={'lg:w-full lg:p-2 lg:box-border flex flex-col items-center'}>
            <section className={'w-full lg:w-5xl'}>

                <PostDetail post={post} postReaction={<PostReaction/>}/>

                <div className={'flex justify-end mt-2 gap-2'}>
                    <CancleButton svg={null} type='button' value='목록' onClick={() => navigate(-1)}/>
                    {
                    memberEmail === user?.email && board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'MODIFY' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))
                        ? 
                        <>
                            <InsertButton svg={null} type='button' value='수정' onClick={handleEdit}/>
                        </>
                        :
                        ""
                    } 
                    {
                    memberEmail === user?.email && board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'DELETE' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))
                        ? 
                        <>
                            <DeleteButton svg={null} type='button' value='삭제' onClick={handleDelete}/>
                        </>
                        :
                        ""
                    } 
                </div>
            </section>
            <Comment/>
        </main>
    )
}