import type { MouseEventHandler } from 'react';
import styles from '../styles/BoardCardComponent.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

type BoardCardComponentProps = {
    categoryCode: string,
    categoryName: string | null,
    comment: string | null,
}

const BoardCardComponent = ({ categoryCode, categoryName, comment }: BoardCardComponentProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    // 게시판 글 목록 페이지 이동
    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        const categoryCode = e.currentTarget.id;
        navigate(`${location.pathname}/${categoryCode}`);
    }

    return(
        <div className={styles.card} id={categoryCode} onClick={handleClick}>
            <div className={styles.cardHeader}>
                <h2>{categoryName}</h2>
                <p>18개 게시글</p>
            </div>

            <hr />

            <div className={styles.cardBody}>
                <p>{comment}</p>
            </div>

            <hr />

            <div className={styles.cardFooter}>
                <h2>최근게시글</h2>
                <p>데이터 시각화 차트 개선 사항</p>
            </div>
        </div>
    )
}

export default BoardCardComponent;