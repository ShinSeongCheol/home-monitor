import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../features/backoffice/lib/useBackOfficeMenu.tsx';
import {BackOfficeReactionWidget} from "../../../widgets/backoffice";

export const BackOfficeReactionPage = () => {

    const { setMenu }= useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.Reaction
        });
    }, []);

    return (
        <BackOfficeReactionWidget />
    )
}