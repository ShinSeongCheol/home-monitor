import {Nav} from "../../../features/backoffice";
import {BackOfficeBoardRoleCode} from "../../../features/backoffice/boardrolecode";

export const BackOfficeBoardRoleCodeWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'게시판 권한 코드'}/>
                <BackOfficeBoardRoleCode />
            </div>
        </section>
    )
}