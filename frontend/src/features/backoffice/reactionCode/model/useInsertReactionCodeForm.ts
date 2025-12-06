import {type ChangeEvent, type FormEvent, useState} from "react";
import {postReactionCode} from "../api/postReactionCode.ts";
import {useAuth} from "../../../../shared";

export const useInsertReactionCodeForm = () => {

    const [code, setCode] = useState('');
    const [name, setName] = useState('');

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
            await postReactionCode({code:code, name:name}, auth?.accessToken);
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