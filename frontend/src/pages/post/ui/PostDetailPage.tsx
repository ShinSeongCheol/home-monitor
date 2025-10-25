import { useNavigate } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';
import { CancleButton } from '../../../components/ButtonComponent';
import { PostDetail } from '../../../entities/post';
import { usePostDetail } from '../../../entities/post/model/usePostDetail';
import { PostReaction } from '../../../features/reaction';
import {Comment} from '../../../widgets/Comment';
import {DeletePostButton} from "../../../features/post/delete";
import {UpdatePostButton} from "../../../features/post/update";

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

    const {post} = usePostDetail();
    const navigate = useNavigate();

    // const {user} = useAuth();
    // const [board, setBoard] = useState<Board>();
    //
    // useEffect(() => {
    //     const boardRoles = board?.boardRoles;
    //     if (!boardRoles) return;
    //
    //     if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'READ' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
    //         alert('읽기 권한이 없습니다.');
    //         navigate(-1);
    //     }
    // }, [board])

    return(
        <main className={'lg:w-full lg:p-2 lg:box-border flex flex-col items-center'}>
            <section className={'w-full lg:w-5xl'}>

                <PostDetail post={post} postReaction={<PostReaction/>}/>

                <div className={'flex justify-end mt-2 gap-2'}>
                    <CancleButton svg={null} type='button' value='목록' onClick={() => navigate(-1)}/>
                    <UpdatePostButton post={post}/>
                    <DeletePostButton post={post}/>
                </div>

            </section>
            <Comment/>
        </main>
    )
}