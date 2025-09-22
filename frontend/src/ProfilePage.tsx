import { useState, type FormEventHandler } from 'react';
import styles from './styles/Profile.module.css';
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

    const { user, accessToken } = useAuth();
    const navigate = useNavigate();

    const email = user?.email ?? "";
    const [nickname, setNickname] = useState(user?.name ?? "");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        if(newPassword !== confirmedPassword) {
            alert('입력한 새 비밀번호가 서로 다릅니다');
        }

        if(!user) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/member/${user?.name ?? ""}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: user.email,
                nickname: nickname,
                password: password,
                newPassword: newPassword,
            })
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then(() => {
            alert('비밀번호가 변경되었습니다.');
            navigate('/');
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
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">아이디</label>
                        <input type="text" name="email" id="email" value={email} readOnly />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="nickname">이름</label>
                        <input type="text" name="nickname" id="nickname" value={nickname} required onChange={(e) => setNickname(e.target.value)} />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="password">현재 비밀번호</label>
                        <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="newPassword">새 비밀번호</label>
                        <input type="password" name="newPassword" id="newPassword" required onChange={(e) => setNewPassword(e.target.value)} />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="confirmedPassword">새 비밀번호 확인</label>
                        <input type="password" name="confirmedPassword" id="confirmedPassword" required onChange={(e) => setConfirmedPassword(e.target.value)} />
                    </div>

                    <input type="submit" value={"변경"}></input>
                </form>
            </section>
        </main>
    )
}

export default ProfilePage;