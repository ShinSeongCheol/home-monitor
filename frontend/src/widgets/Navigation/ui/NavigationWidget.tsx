import {Navigation} from "../../../features/navigation";

export const NavigationWidget = () => {
    return (
        <nav className={'w-full h-[29px] bg-white border-b border-b-gray-200 sticky flex justify-center items-center'}>
            <Navigation/>
        </nav>
    )
}