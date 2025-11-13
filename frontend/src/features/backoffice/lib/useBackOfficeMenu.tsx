import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type ContextType = {
    setOpenMenu : React.Dispatch<React.SetStateAction<string>>;
    setOpenSideMenu :React.Dispatch<React.SetStateAction<string>>;
}

type Menu = {
    menu: string;
    sideMenu: string;
}

const useBackOfficeMenu = () => {
    const [menu, setMenu] = useState<Menu>({
        menu: '',
        sideMenu: '',
    });

    const { setOpenMenu, setOpenSideMenu } = useOutletContext<ContextType>();

    // 초기화
    useEffect(() => {
        setOpenMenu(menu?.menu);
        setOpenSideMenu(menu.sideMenu);
    }, [menu]);

    return {setMenu};
}

export default useBackOfficeMenu;