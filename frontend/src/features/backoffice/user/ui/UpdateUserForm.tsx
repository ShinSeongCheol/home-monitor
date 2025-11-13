import type {BackOfficeMember} from "../../model/type.ts";
import {CancelButton, InsertButton} from "../../../../shared/ui";
import {BackOfficeModalLayout} from "../../../../shared";
import {useUpdateUserForm} from "../model/useUpdateUserForm.ts";

type UpdateUserFormProps = {
    fetchUsers: () => Promise<void>;
    data: BackOfficeMember|undefined;
    handleClickCancel: () => void;
}

export const UpdateUserForm = ({fetchUsers, data, handleClickCancel}: UpdateUserFormProps) => {

    if (!data) {
        handleClickCancel();
        return ;
    }

    const {
        email,
        handleChangeEmail,
        username,
        handleChangeUsername,
        password,
        handleChangePassword,
        confirmPassword,
        handleChangeConfirmPassword,
        handleClickSubmit,
    } = useUpdateUserForm(data);

    const form = (
        <form className={'flex flex-col gap-4 w-sm'} onSubmit={(e) => handleClickSubmit(e, fetchUsers, handleClickCancel)}>
            <div className={`flex flex-col gap-2`}>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='email'>이메일</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="email" id="email" name="email" value={email} maxLength={16} onChange={handleChangeEmail}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='username'>이름</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="text" id="code" name="username" value={username} maxLength={16} required onChange={handleChangeUsername}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='password'>비밀번호</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="password" id="password" name="password" value={password} maxLength={32} onChange={handleChangePassword}/>
                </div>

                <div className={'flex items-center'}>
                    <label className={'w-28 select-none'} htmlFor='confirmPassword'>비밀번호 확인</label>
                    <input className={'flex-1 h-8 bg-gray-300 border-none rounded-sm'} type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} maxLength={32} onChange={handleChangeConfirmPassword}/>
                </div>

            </div>

            <div className={`flex justify-end gap-1`}>
                <CancelButton svg={null} value='취소' type='button' onClick={handleClickCancel}></CancelButton>
                <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
            </div>
        </form>
    )

    return (
        <BackOfficeModalLayout title={'사용자 수정'} content={'사용자를 수정합니다.'} cancel={handleClickCancel} children={form} />
    )
}