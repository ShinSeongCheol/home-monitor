import {backendUrl} from "../../../shared";

export const kakaoLogin = async (code: string) => {
    const res = await fetch(`${backendUrl}/api/v1/auth/kakao`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            code: code
        })
    });

    if (!res.ok) {
        throw new Error(`Http Error ${res.status}`);
    }

    return await res.json();
}