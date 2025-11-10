import {type ChangeEvent, type FormEvent, useState} from "react";
import {postBoard} from "../api/postBoard.ts";
import {useAuth} from "../../../../shared";

export const useInsertBoardForm = () => {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const {auth} = useAuth();

    const handleClickInsert = () => {
        setCode("");
        setName("");
        setComment("");
    };

    const handleClickCancel = () => {
        setCode("");
        setName("");
        setComment("");
    };

    const handleChangeCode = (e:ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeComment = (e:ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement> , fetchBoard: () => Promise<void>) => {
        e.preventDefault();

        try {
            await postBoard(code, name, comment, auth?.accessToken)
            await fetchBoard();
        }catch(err) {
            // Todo 에러 처리 필요
            console.error(err);
        }
    };

    return {
        code,
        name,
        comment,
        handleClickInsert,
        handleClickCancel,
        handleChangeCode,
        handleChangeName,
        handleChangeComment,
        handleClickSubmit
    };
}