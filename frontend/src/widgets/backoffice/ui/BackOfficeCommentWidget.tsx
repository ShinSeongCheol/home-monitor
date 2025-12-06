import {Nav} from "../../../features/backoffice";
import {BackOfficeComment} from "../../../features/backoffice/comment";

export const BackOfficeCommentWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'게시판 관리'} tertiaryMenu={'댓글 목록'}/>
                <BackOfficeComment />
            </div>
        </section>
    )
}