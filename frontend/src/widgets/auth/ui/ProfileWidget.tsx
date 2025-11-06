import styles from "../../../styles/pages/ProfilePage.module.css";

import {ProfileForm} from "../../../features/auth";

export const ProfileWidget = () => {
    return (
        <section className={styles.section}>
            <h2>내 정보</h2>
            <ProfileForm />
        </section>
    )
}