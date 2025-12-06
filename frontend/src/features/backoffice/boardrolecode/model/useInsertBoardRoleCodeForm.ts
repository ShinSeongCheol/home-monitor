import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAuth} from "../../../../shared";
import {postBoardRoleCode} from "../api/postBoardRoleCode.ts";

export const useInsertBoardRoleCodeForm = () => {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    const {auth} = useAuth();

    const handleClickInsert = () => {
        setCode("");
        setName("");
    };

    const handleClickCancel = () => {
        setCode("");
        setName("");
    };

    const handleChangeCode = (e:ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement> , fetchBoard: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await postBoardRoleCode({code, name}, auth?.accessToken)
            await fetchBoard();
            handleClickCancel();
        }catch(err) {
            // Todo 에러 처리 필요
            console.error(err);
        }
    };

    return {
        code,
        name,
        handleClickInsert,
        handleClickCancel,
        handleChangeCode,
        handleChangeName,
        handleClickSubmit
    };
}