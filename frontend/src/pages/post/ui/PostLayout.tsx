import {Outlet} from "react-router-dom";

export const PostLayout = () => {
    return (
        <main className={'w-full p-2 lg:w-5xl lg:box-border flex flex-col items-center'}>
            <Outlet />
        </main>
    )
}