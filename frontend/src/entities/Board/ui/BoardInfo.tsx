import {useBoardInfo} from "../model/useBoardInfo.ts";
import type {Board} from "../model/type.ts";

type BoardInfoProps = {
    board: Board | undefined;
};

export const BoardInfo = ({board}: BoardInfoProps) => {

    const {handleClick} = useBoardInfo();

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