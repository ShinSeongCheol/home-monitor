import {useEffect} from 'react';

import {MenuType, SideMenuType} from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../features/backoffice/lib/useBackOfficeMenu.tsx';
import {BackOfficeBoardRoleCodeWidget} from "../../../widgets/backoffice";

export const BackOfficeBoardRoleCodePage = () => {

    const {setMenu} = useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.BoardRoleCode
        });
    }, []);

    return (
        <BackOfficeBoardRoleCodeWidget/>
    )
}