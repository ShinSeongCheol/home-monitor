import { ChevronRight, KeyRound, List, Shield, SquarePen, TextAlignJustify, User } from 'lucide-react';
import styles from '../styles/layouts/BackOfficeLayout.module.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BackOfficeLayout = () => {

    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    }

    return (
        <div className={styles.backoffice}>
            <aside className={styles.sidebar}>
                <div className={styles.title}>메뉴<TextAlignJustify strokeWidth={1} /></div>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <div className={`${styles.menu} ${openMenu === "board" ? styles.open : ""}`} onClick={() => toggleMenu("board")}>
                                <SquarePen size={'16px'} strokeWidth={1} />
                                <span>게시판 관리</span>
                                <ChevronRight className={`${styles.chevron} ${openMenu === "board" ? styles.open : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            {openMenu === 'board' && (
                                <ul className={styles.submenu}>
                                    <li><List size={'16px'} strokeWidth={1} /> 게시판 목록</li>
                                    <li><List size={'16px'} strokeWidth={1} /> 게시물 목록</li>
                                    <li><Shield size={'16px'} strokeWidth={1} /> 게시판 권한 </li>
                                    <li><KeyRound size={'16px'} strokeWidth={1} /> 게시판 권한 코드</li>

                                    <li><List size={'16px'} strokeWidth={1} /> 댓글 목록</li>

                                    <li><List size={'16px'} strokeWidth={1} /> 반응 목록</li>
                                    <li><KeyRound size={'16px'} strokeWidth={1} /> 반응 코드</li>
                                </ul>
                            )}

                        </li>

                        <li>
                            <div className={`${styles.menu} ${openMenu === "user" ? styles.open : ""}`} onClick={() => toggleMenu("user")}>
                                <User size={'16px'} strokeWidth={1} />
                                <span>사용자 관리</span>
                                <ChevronRight className={`${styles.chevron} ${openMenu === "user" ? styles.open : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            {openMenu === 'user' && (
                                <ul className={styles.submenu}>
                                    <li><List size={'16px'} strokeWidth={1} /> 사용자 목록</li>
                                    <li><Shield size={'16px'} strokeWidth={1} /> 사용자 권한</li>
                                    <li><KeyRound size={'16px'} strokeWidth={1} /> 사용자 권한 코드</li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default BackOfficeLayout;