import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAuth} from "../../../../shared";
import {putBoardRoleCode} from "../api/putBoardRoleCode.ts";
import type {BackOfficeBoardRoleCode} from "../../model/type.ts";

export const useUpdateBoardRoleCodeForm = (data: BackOfficeBoardRoleCode) => {

    const [code, setCode] = useState(data.code);
    const [name, setName] = useState(data.name);

    const {auth} = useAuth();

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchBoard: () => Promise<void>, handleClickCancel: () => void ) => {
        e.preventDefault();

        await putBoardRoleCode(data.id, {code, name}, auth?.accessToken).catch(console.error);
        await fetchBoard();
        handleClickCancel();
    };

    return {code, name, handleChangeCode, handleChangeName, handleClickSubmit};
}