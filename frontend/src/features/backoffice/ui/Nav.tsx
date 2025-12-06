import {Link} from "react-router-dom";
import {ChevronRight} from "lucide-react";

type NavProps = {
    primaryMenu: string;
    secondaryMenu: string;
    tertiaryMenu: string;
}

export const Nav = ({primaryMenu, secondaryMenu, tertiaryMenu}: NavProps) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className={'flex justify-start items-center gap-2'}>
                <li>
                    <Link className={'p-1 rounded-xs hover:bg-gray-300'} to={'/backoffice'}>{primaryMenu}</Link>
                </li>
                <ChevronRight size={16} color="black" strokeWidth={1}/>
                <li>{secondaryMenu}</li>
                <ChevronRight size={16} color="black" strokeWidth={1}/>
                <li aria-current="page">{tertiaryMenu}</li>
            </ol>
        </nav>
    )
}