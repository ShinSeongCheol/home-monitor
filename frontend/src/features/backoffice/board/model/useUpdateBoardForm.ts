import {type ChangeEvent, type FormEvent, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import {updateBoard} from "../api/updateBoard.ts";
import {useAuth} from "../../../../shared";

export const useUpdateBoardForm = (agGridReact: AgGridReact | null) => {

    const selectedRow = agGridReact?.api.getSelectedRows()[0];

    const [code, setCode] = useState(selectedRow.categoryCode);
    const [name, setName] = useState(selectedRow.categoryName);
    const [comment, setComment] = useState(selectedRow.comment);

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

        await updateBoard(selectedRow.id, code, name, comment, auth?.accessToken).catch(console.error);
        await fetchBoard();
        handleClickCancel();
    };

    return {code, name, comment, handleChangeCode, handleChangeName, handleChangeComment, handleClickSubmit};
}