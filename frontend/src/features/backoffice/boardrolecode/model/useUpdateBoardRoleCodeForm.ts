import {type ChangeEvent, type FormEvent, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import {useAuth} from "../../../../shared";
import {putBoardRoleCode} from "../api/putBoardRoleCode.ts";
import type {BackOfficeBoardRoleCode} from "../../model/type.ts";

export const useUpdateBoardRoleCodeForm = (agGridReact: AgGridReact | null) => {

    const selectedRow:BackOfficeBoardRoleCode = agGridReact?.api.getSelectedRows()[0];

    const [code, setCode] = useState(selectedRow.code);
    const [name, setName] = useState(selectedRow.name);

    const {auth} = useAuth();

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchBoard: () => Promise<void>, handleClickCancel: () => void ) => {
        e.preventDefault();

        await putBoardRoleCode(selectedRow.id, {code, name}, auth?.accessToken).catch(console.error);
        await fetchBoard();
        handleClickCancel();
    };

    return {code, name, handleChangeCode, handleChangeName, handleClickSubmit};
}