import styles from '../styles/components/Navigation.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Settings, SquarePen } from 'lucide-react';

const navigation = () => {

    const location = useLocation();
    const { user } = useAuth();

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <ul className={styles.menuContainer}>
                    <li className={location.pathname === '/' ? `${styles.active}` : ""}>
                        <LayoutDashboard size={"16px"} color={"gray"} strokeWidth={1} />
                        <Link to={"/"} >대시보드</Link>
                    </li>
                    <li className={location.pathname.includes('boards') ? `${styles.active}` : ""}>
                        <SquarePen size={"16px"} color={"gray"} strokeWidth={1} />
                        <Link to={"/boards"} >게시판</Link>
                    </li>
                    {user?.authorities.includes("ROLE_ADMIN")
                        ?
                        <li className={location.pathname === '/configuration/forecast/administrativeDistrict' ? `${styles.active}` : ""}>
                            <Settings size={"16px"} color={"gray"} strokeWidth={1} />
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