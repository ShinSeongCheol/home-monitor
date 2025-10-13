import { useEffect, useState } from "react";
import { getBoard } from "../api/getBoard";
import type { Board } from "../models/Board";
import { useNavigate } from "react-router-dom";


export const BoardInfo = ({ categoryCode }: { categoryCode: string | undefined }) => {

    const navigate = useNavigate();
    const [board, setBoard] = useState<Board>();

    // 게시판 데이터 조회
    useEffect(() => {
        (async () => {
            try {
                const board = await getBoard(categoryCode);
                setBoard(board);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleClick = (postId: number) => {
        navigate(`${location.pathname}/${postId}`);
    }

    return (
        <>
            <div className='my-4'>
                <h2 className="text-4xl">{board?.categoryName ?? ""}</h2>
                <p>{board?.comment ?? ""}</p>
            </div>

            <table className="w-full table-auto lg:table-fixed bg-white border-separate border-spacing-0 border border-gray-400 rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">번호</th>
                        <th className="p-2">제목</th>
                        <th className="p-2">작성자</th>
                        <th className="p-2">작성일</th>
                        <th className="p-2">조회수</th>
                    </tr>
                </thead>
                
                <tbody className="text-center">
                    {board?.posts.sort((a, b) => b.id - a.id).map(post =>
                        <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 hover:cursor-pointer" key={post.id} onClick={() => handleClick(post.id)}>
                            <td className="p-1" title={`${post.id}`}>{post.id}</td>
                            <td className="p-1" title={`${post.title}`}>{post.title}</td>
                            <td className="p-1" title={`${post.member.nickname}`}>{post.member.nickname}</td>
                            <td className="p-1" title={`${new Date(post.createdAt ?? "").toLocaleString()}`}>{new Date(post.createdAt ?? "").toLocaleString()}</td>
                            <td className="p-1" title={`${post.view}`}>{post.view}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}