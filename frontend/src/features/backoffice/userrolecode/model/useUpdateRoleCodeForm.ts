import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAuth} from "../../../../shared";
import type {BackOfficeMemberRoleCode} from "../../model/type.ts";
import {putUserRoleCode} from "../api/putUserRoleCode.ts";

export const useUpdateRoleCodeForm = (data: BackOfficeMemberRoleCode) => {

    const [code, setCode] = useState(data.code);
    const [name, setName] = useState(data.name);

    const {auth} = useAuth();

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement>, fetchUserRoleCodes: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await putUserRoleCode(data.id, {code:code, name:name}, auth?.accessToken);
            await fetchUserRoleCodes();
            handleClickCancel();
        }catch (err) {
            console.error(err);
        }
    }

    return  {
        code,
        name,
        handleChangeCode,
        handleChangeName,
        handleClickSubmit
    }
}