import {ProfileForm} from "../../../features/auth";

export const ProfileWidget = () => {
    return (
        <section className={'w-full max-w-xl p-2 bg-white border border-gray-300 rounded-xs'}>
            <h2 className={'text-2xl'}>내 정보</h2>
            <ProfileForm />
        </section>
    )
}