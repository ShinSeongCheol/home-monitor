import styles from './PostCreatePage.module.css';

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getBoard, type Board } from '../../../entities/board';
import { PostCreateForm } from '../../../features/post/create';

export const PostCreatePage = () => {

    const {user} = useAuth();

    const navigate = useNavigate();
    const {categoryCode} = useParams();

    const [board, setBoard] = useState<Board>();

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

        if(!boardRoles.some(boardRole => boardRole.boardRoleCode.code === 'WRITE' && (!boardRole.memberRoleCode?.code || user?.authorities.includes(boardRole.memberRoleCode.code)))) {
            alert('쓰기 권한이 없습니다.');
            navigate(-1);
        };
    }, [board])

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <PostCreateForm />
            </section>
        </main>
    )
}