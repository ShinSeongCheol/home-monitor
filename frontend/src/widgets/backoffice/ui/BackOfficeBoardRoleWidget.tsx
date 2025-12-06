import {Nav} from "../../../features/backoffice";
import {BackOfficeBoardRole} from "../../../features/backoffice/boardrole";

export const BackOfficeBoardRoleWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'게시판 권한'}/>
                <BackOfficeBoardRole />
            </div>
        </section>
    )
}