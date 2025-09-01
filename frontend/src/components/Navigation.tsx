import styles from '../styles/Navigation.module.css'
import { Link, useLocation } from 'react-router-dom';
import DashboardSVG from '../assets/icon/dashboard.svg?react';
import SettingSVG from '../assets/icon/settings.svg?react';
import { useAuth } from '../contexts/AuthContext';

const navigation = () => {

    const location = useLocation();
    const { user } = useAuth();

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <ul className={styles.menuContainer}>
                    <li className={location.pathname === '/' ? `${styles.active}` : ""}>
                        <DashboardSVG width={"16px"} height={"16px"} fill={"gray"}></DashboardSVG>
                        <Link to={"/"} >대시보드</Link>
                    </li>
                    {user?.authorities.includes("ROLE_ADMIN")
                        ?
                        <li className={location.pathname === '/configuration/forecast/administrativeDistrict' ? `${styles.active}` : ""}>
                            <SettingSVG width={"16px"} height={"16px"} fill={"gray"}></SettingSVG>
                            <Link to={"/configuration/forecast/administrativeDistrict"}>설정</Link>
                        </li>
                        :
                        ""
                    }
                </ul>
            </div>
        </nav>
    )
}

export default navigation;