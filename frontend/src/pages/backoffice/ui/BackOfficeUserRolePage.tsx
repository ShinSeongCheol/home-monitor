import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../features/backoffice/lib/useBackOfficeMenu.tsx';
import {BackOfficeUserRoleWidget} from "../../../widgets/backoffice";

export const BackOfficeUserRolePage = () => {

    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.User,
            sideMenu: SideMenuType.UserRole
        });
    }, []);

    return (
        <BackOfficeUserRoleWidget />
    )
}