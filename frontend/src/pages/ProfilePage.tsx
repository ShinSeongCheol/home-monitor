import styles from '../styles/pages/ProfilePage.module.css';
import {ProfileWidget} from "../widgets/auth";

const ProfilePage = () => {

    return(
        <main className={styles.main}>
            <ProfileWidget />
        </main>
    )
}

export default ProfilePage;