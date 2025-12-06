import {Nav} from "../../../features/backoffice";
import {BackOfficeReaction} from "../../../features/backoffice/reaction";

export const BackOfficeReactionWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'반응 목록'}/>
                <BackOfficeReaction />
            </div>
        </section>
    )
}