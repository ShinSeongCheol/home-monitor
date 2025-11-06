import {LoginButton} from "../../../features/auth";
import {Thermometer} from "lucide-react";

export const HeaderWidget = () => {
    return (
        <header className={'w-full h-[39px] bg-white border border-gray-200'}>
            <div className={'max-w-5xl h-full mx-auto my-0 flex justify-between items-center'}>
                <div className={'flex items-center'}>
                    <Thermometer size={'32px'} fill={"#d47878ff"} color={'#d47878ff'}/>
                    <h1 className={'font-[DMSans] text-2xl'}>ClimaHome</h1>
                </div>

                <LoginButton />
            </div>
        </header>
    )
}