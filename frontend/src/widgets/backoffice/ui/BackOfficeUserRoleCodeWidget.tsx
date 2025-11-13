import {Nav} from "../../../features/backoffice";
import {BackOfficeUserRoleCode} from "../../../features/backoffice/userrolecode";

export const BackOfficeUserRoleCodeWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'사용자 관리'} tertiaryMenu={'사용자 권한 코드'}/>
                <BackOfficeUserRoleCode />
            </div>
        </section>
    )
}