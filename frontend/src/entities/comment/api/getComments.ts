export const getComments = async (categoryCode: string|undefined, postId: string|undefined) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/boards/${categoryCode}/${postId}/comment`)
    if(!res.ok) throw new Error(`Http Error ${res.status}`);
    return await res.json();
}