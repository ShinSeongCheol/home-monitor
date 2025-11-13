import {Nav} from "../../../features/backoffice";
import {BackOfficeUserRole} from "../../../features/backoffice/userrole";

export const BackOfficeUserRoleWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'사용자 관리'} tertiaryMenu={'사용자 권한 목록'}/>
                <BackOfficeUserRole />
            </div>
        </section>
    )
}