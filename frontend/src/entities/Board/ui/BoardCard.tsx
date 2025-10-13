import type { MouseEventHandler } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type BoardCardProps = {
    categoryCode: string;
    categoryName: string | null;
    count: number | null;
    comment: string;
    latestPost: {
        id: number;
        title: string | null;
        content: string | null;
        view: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        member: {
            email: string | null;
            nickname: string | null;
        }
    } | null;
}

export const BoardCard = ({categoryCode, categoryName, count, comment, latestPost}: BoardCardProps) => {

    const navigate = useNavigate();
    const location = useLocation();

    // 게시판 글 목록 페이지 이동
    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        const categoryCode = e.currentTarget.id;
        navigate(`${location.pathname}/${categoryCode}`);
    }

    return (
        <div className='bg-white hover:bg-gray-50 border border-solid border-gray-50 rounded-md shadow-md p-4 hover:cursor-pointer' id={categoryCode} onClick={handleClick}>
            <div className='flex justify-between items-center py-2 border-b border-b-gray-400'>
                <h2 className="text-lg">{categoryName}</h2>
                <p className="text-sm text-gray-500">{count}개 게시글</p>
            </div>

            <div className='flex items-center py-4 border-b border-b-gray-400'>
                <p className="text-base text-gray-500">{comment}</p>
            </div>

            <div className="py-2">
                <h2 className="text-lg">최근게시글</h2>
                <p className="text-sm text-gray-500">{latestPost?.title ?? ""}</p>
            </div>
        </div>
    )
}