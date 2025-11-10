import {backendUrl} from "../../../shared";

type putProfileParams = {
    email: string;
    name: string;
    nickname: string;
    password: string;
    newPassword: string;
    accessToken: string;
}

export const putProfile = async ({email, name, nickname, password, newPassword, accessToken}: putProfileParams) => {
    const res = await fetch(`${backendUrl}/api/v1/member/${name}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            email: email,
            nickname: nickname,
            password: password,
            newPassword: newPassword,
        })
    })

    if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
    }

    return await res.json();
}