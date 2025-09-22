import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './styles/BoardList.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import type { Board } from './BoardPage';

const PostPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [board, setBoard] = useState<Board>();
    const {user} = useAuth();

    useEffect(() => {
        const categoryCode = params.categoryCode;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}`)
        .then(res => {
            if (!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
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

    const handleClick = (postId: number) => {
        navigate(`${location.pathname}/${postId}`);
    }

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.title}>
                    <h2>{board?.categoryName ?? ""}</h2>
                    <p>{board?.comment ?? ""}</p>
                </div>

                <div className={styles.listContainer}>
                    <ul className={`${styles.board_list} ${styles.first_list}`}>
                        <li>번호</li>
                        <li>제목</li>
                        <li>작성자</li>
                        <li>작성일</li>
                        <li>조회수</li>
                    </ul>

                    <div className={styles.contentListContainer}>
                        {board?.posts.sort((a, b) => b.id - a.id).map(post => 
                            <ul key={post.id} className={`${styles.board_list}`} onClick={() => handleClick(post.id)}>
                                <li title={`${post.id}`}>{post.id}</li>
                                <li title={`${post.title}`}>{post.title}</li>
                                <li title={`${post.member.nickname}`}>{post.member.nickname}</li>
                                <li title={`${new Date(post.createdAt ?? "").toLocaleString()}`}>{new Date(post.createdAt ?? "").toLocaleString()}</li>
                                <li title={`${post.view}`}>{post.view}</li>
                            </ul>
                        )}
                    </div>
                </div>
                
                <div className={styles.buttonContainer}>
                    <input className={styles.cancleButton} type="button" value="뒤로가기" onClick={() => navigate(-1)} />
                    {
                    board?.boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'WRITE' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))
                        ?
                        <input className={styles.submitButton} type="button" value="글쓰기" onClick={() => navigate(`${location.pathname}/post`)} />
                        :
                        ""
                    }
                </div>
            </section>
        </main>
    )
}

export default PostPage;