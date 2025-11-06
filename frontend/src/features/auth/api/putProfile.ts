export const putProfile = async (email, name, nickname, password, newPassword, accessToken) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/member/${name}`, {
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

    if(!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
    }

    return await res.json();
}