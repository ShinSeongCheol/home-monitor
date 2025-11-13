import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAuth} from "../../../../shared";
import {postUserRoleCode} from "../api/postUserRoleCode.ts";

export const useInsertRoleCodeForm = () => {

    const [code, setCode] = useState('');
    const [name, setName] = useState('');

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
            await postUserRoleCode({code:code, name:name}, auth?.accessToken);
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