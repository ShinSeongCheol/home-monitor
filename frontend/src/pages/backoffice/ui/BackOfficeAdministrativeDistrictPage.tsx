import { useEffect } from "react";
import { MenuType, SideMenuType } from "./BackOfficeLayout.tsx";
import useBackOfficeMenu from "../../../features/backoffice/lib/useBackOfficeMenu.tsx";
import {BackofficeAdministrativeDistrictWidget} from "../../../widgets/backoffice";

export const BackOfficeAdministrativeDistrictPage = () => {
    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Weather,
            sideMenu: SideMenuType.AdministrativeDistrict
        });
    }, []);
    
    return (
        <BackofficeAdministrativeDistrictWidget />
    )
}