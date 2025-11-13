import {CancelButton, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import {useInsertUserRoleForm} from "../model/useInsertUserRoleForm.ts";

type InsertUserRoleFormProps = {
    fetchUserRoles: () => Promise<void>;
    handleClickCancel: () => void;
}

export const InsertUserRoleForm = ({fetchUserRoles, handleClickCancel}:InsertUserRoleFormProps) => {

    const {
        users,
        userRoleCodes,
        selectedUserId,
        handleChangeSelectedUserId,
        selectedUserRoleCodeId,
        handleChangeSelectedUserRoleCodeId,
        handleClickSubmit,
    } = useInsertUserRoleForm();

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchUserRoles, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='user'>유저</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='user' value={selectedUserId} onChange={handleChangeSelectedUserId}>
                        {users?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                        })}
                    </select>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='userRoleCode'>사용자 권한 코드</label>
                    <select className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} name='userRoleCode' value={selectedUserRoleCodeId} onChange={handleChangeSelectedUserRoleCodeId}>
                        {userRoleCodes?.map((value) => {
                            return <option key={value.id} value={value.id}>{value.name} ({value.code})</option>
                        })}
                    </select>
                </div>

            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'사용자 권한 추가'} content={'새로운 사용자 권한을 추가합니다.'} cancel={handleClickCancel} children={form} />
    )
}