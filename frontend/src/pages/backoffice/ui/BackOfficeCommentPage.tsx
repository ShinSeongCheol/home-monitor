import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../hooks/useBackOfficeMenu.tsx';
import {BackOfficeCommentWidget} from "../../../widgets/backoffice";

export const BackOfficeCommentPage = () => {

    const { setMenu }= useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.Comment
        });
    }, []);

    return (
        <BackOfficeCommentWidget />
    )
}