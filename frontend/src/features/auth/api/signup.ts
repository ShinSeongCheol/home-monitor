import {backendUrl} from "../../../shared";

export const signup = async (email: string, nickname: string, password: string) => {
    const res = await fetch(`${backendUrl}/api/v1/member/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            nickname: nickname,
            password: password,
        }),
    })

    if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);
    return await res.json();
}