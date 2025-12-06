import {Nav} from "../../../features/backoffice";
import {BackOfficeUser} from "../../../features/backoffice/user";

export const BackOfficeUserWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'사용자 관리'} tertiaryMenu={'사용자 목록'}/>
                <BackOfficeUser />
            </div>
        </section>
    )
}