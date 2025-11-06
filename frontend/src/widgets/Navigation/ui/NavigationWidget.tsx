import {Navigation} from "../../../features/navigation";

export const NavigationWidget = () => {
    return (
        <nav className={'w-full h-[29px] bg-white border-b-gray-100 sticky flex justify-center items-center'}>
            <Navigation/>
        </nav>
    )
}