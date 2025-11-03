import {backendUrl} from "../../../shared";

export const login = async (email: string, password: string) => {
    const res = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });

    if (!res.ok) throw new Error(`${res.status}`);

    return await res.json();
}