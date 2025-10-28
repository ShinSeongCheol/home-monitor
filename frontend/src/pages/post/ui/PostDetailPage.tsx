import { PostDetailWidget } from "../../../widgets/post";

export const PostDetailPage = () => {



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
        <PostDetailWidget />
    )
}