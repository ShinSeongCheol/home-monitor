import {Outlet} from "react-router-dom";
import {TabNav} from "../../../features/auth";

export const AuthLayout = () => {
    return (
        <main className={'w-full h-[calc(100dvh-(29px+39px))] flex justify-center items-center'}>
            <section className={'w-[400px] p-4 bg-white border border-solid border-gray-300 rounded-xl'}>
                <TabNav/>
                <Outlet />
            </section>
        </main>
    )
}