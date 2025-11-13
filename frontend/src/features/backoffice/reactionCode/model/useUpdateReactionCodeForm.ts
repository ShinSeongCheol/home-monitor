import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAuth} from "../../../../shared";
import type {BackOfficeReactionCode} from "../../model/type.ts";
import {putReactionCode} from "../api/putReactionCode.ts";

export const useUpdateReactionCodeForm = (data: BackOfficeReactionCode) => {

    const [code, setCode] = useState(data.code);
    const [name, setName] = useState(data.name);

    const {auth} = useAuth();

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement>, fetchReactionCodes: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await putReactionCode(data.id, {code:code, name:name}, auth?.accessToken);
            await fetchReactionCodes();
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