import {backendUrl} from "../../../../shared";

export const putPost = async (id: number|undefined, body: {memberId: number|undefined, boardId: number|undefined, title: string|undefined, content: string|undefined}) => {
    const res = await fetch(`${backendUrl}/api/v1/backoffice/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            memberId: selectedMemberId,
            boardId: selectedBoardId,
            title: title,
            content: content,
        })
    })
    if(!res.ok) throw new Error(`Http Status ${res.status}`);
    return await res.json();
}