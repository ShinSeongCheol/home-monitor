import type { FormEventHandler } from 'react';
import styles from './styles/Profile.module.css';
import { useAuth } from './contexts/AuthContext';

const Profile = () => {

    const { user, auth, login } = useAuth();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const username = String(formData.get('username'));
        const password = String(formData.get('password'));
        const new_password = String(formData.get('new_password'));
        const confirmed_password = String(formData.get('confirmed_password'));

        if(new_password !== confirmed_password) {
            alert('입력한 새 비밀번호가 서로 다릅니다');
        }

        if(!auth) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/member/${user?.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth,
            },
            body: JSON.stringify({
                name: username,
                password,
                newPassword: new_password,
            })
        })
        .then(res => {
            if(res.ok) {
                alert('비밀번호가 변경되었습니다.');
                login(username, new_password);
            }else {
                throw new Error(`HTTP Error ${res.status}`);
            }
        })
        .catch(error => {
            console.error(error);
        })
        ;

    }

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <h2>내 정보</h2>
                <form className={styles.profileForm} onSubmit={handleSubmit}>
                    <label htmlFor="username">아이디</label>
                    <input type="text" name="username" id="username" value={user?.username} readOnly />
                    
                    <label htmlFor="password">현재 비밀번호</label>
                    <input type="password" name="password" id="password" />

                    <label htmlFor="new_password">새 비밀번호</label>
                    <input type="password" name="new_password" id="new_password" />

                    <label htmlFor="confirmed_password">새 비밀번호 확인</label>
                    <input type="password" name="confirmed_password" id="confirmed_password" />
                    <button type="submit">변경</button>
                </form>
            </section>
        </main>
    )
}

export default Profile;