import {Nav} from "../../../features/backoffice";
import {BackOfficeBoard} from "../../../features/backoffice/board";

export const BackOfficeBoardWidget = () => {

    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'게시판 목록'}/>
                <BackOfficeBoard />
            </div>
        </section>
    )
}