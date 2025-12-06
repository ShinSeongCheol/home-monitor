import {type ChangeEvent, type FormEvent, useState} from "react";
import {updateBoard} from "../api/updateBoard.ts";
import {useAuth} from "../../../../shared";
import type {BackOfficeBoard} from "../../model/type.ts";

export const useUpdateBoardForm = (data: BackOfficeBoard) => {

    const [code, setCode] = useState(data.categoryCode);
    const [name, setName] = useState(data.categoryName);
    const [comment, setComment] = useState(data.comment);

    const {auth} = useAuth();

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchBoard: () => Promise<void>, handleClickCancel: () => void ) => {
        e.preventDefault();

        await updateBoard(data.id, code, name, comment, auth?.accessToken).catch(console.error);
        await fetchBoard();
        handleClickCancel();
    };

    return {code, name, comment, handleChangeCode, handleChangeName, handleChangeComment, handleClickSubmit};
}