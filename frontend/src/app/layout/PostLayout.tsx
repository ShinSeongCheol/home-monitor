import {Outlet} from "react-router-dom";

export const PostLayout = () => {

    return (
        <main className='w-full flex justify-center'>
            <Outlet />
        </main>
    )
}