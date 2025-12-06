import {Nav} from "../../../features/backoffice";
import {BackOfficeReactionCode} from "../../../features/backoffice/reactionCode";

export const BackOfficeReactionCodeWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'반응 코드'}/>
                <BackOfficeReactionCode />
            </div>
        </section>
    )
}