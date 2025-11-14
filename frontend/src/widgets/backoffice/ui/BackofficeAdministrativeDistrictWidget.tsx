import {Nav} from "../../../features/backoffice";
import {
    BackOfficeAdministrativeDistrict
} from "../../../features/backoffice/administrativedistrcit/ui/BackOfficeAdministrativeDistirict.tsx";

export const BackofficeAdministrativeDistrictWidget = () => {
    return (
        <section className={`h-full`}>
            <div className={'h-full p-4 flex flex-col gap-4'}>
                <Nav primaryMenu={'관리자'} secondaryMenu={'기상데이터 관리'} tertiaryMenu={'행정 구역 코드'}/>
                <BackOfficeAdministrativeDistrict />
            </div>
        </section>
    )
}