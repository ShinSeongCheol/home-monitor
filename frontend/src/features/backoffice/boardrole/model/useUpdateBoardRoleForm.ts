import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type {
    BackOfficeBoard, BackOfficeBoardRole,
    BackOfficeBoardRoleCode,
    BackOfficeMemberRoleCode
} from "../../model/type.ts";
import {getBackOfficeBoards} from "../../api/getBackOfficeBoards.ts";
import {getBackOfficeBoardRoleCodes} from "../../api/getBackOfficeBoardRoleCodes.ts";
import {getBackOfficeMemberRoleCodes} from "../../api/getBackOfficeMemberRoleCodes.ts";
import {useAuth} from "../../../../shared";
import type {AgGridReact} from "ag-grid-react";
import {updateBoardRole} from "../api/updateBoardRole.ts";

export const useUpdateBoardRoleForm = (agGridReact: AgGridReact | null) => {

    const [boards, setBoards] = useState<BackOfficeBoard[]>([]);
    const [boardRoleCodes, setBoardRoleCodes] = useState<BackOfficeBoardRoleCode[]>([]);
    const [memberRoleCodes, setMemberRoleCodes] = useState<BackOfficeMemberRoleCode[]>([]);

    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedBoardRoleCodeId, setSelectedBoardRoleCodeId] = useState<number>();
    const [selectedMemberRoleCodeId, setSelectedMemberRoleCodeId] = useState<number>();

    const {auth} = useAuth();

    const selectedRow: BackOfficeBoardRole = agGridReact?.api.getSelectedRows()[0];

    const handleChangeBoardId = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedBoardId(Number(e.target.value));
    }

    const handleChangeBoardRoleCodeId = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedBoardRoleCodeId(Number(e.target.value));
    }

    const handleChangeMemberRoleCodeId = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMemberRoleCodeId(Number(e.target.value));
    }

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchBoardRoles: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        const selectedRow = agGridReact?.api.getSelectedRows()[0]
        if (!selectedRow) return;

        try {
            await updateBoardRole(selectedRow.id, {
                boardId: selectedBoardId,
                boardRoleCodeId: selectedBoardRoleCodeId,
                memberRoleCodeId: selectedMemberRoleCodeId
            }, auth?.accessToken);
            await fetchBoardRoles();
            handleClickCancel();
        } catch (err) {
            console.error(err);
        }
    }

    const fetchBoards = async () => {
        try {
            const data: BackOfficeBoard[] = await getBackOfficeBoards();

            setBoards(data);
            setSelectedBoardId(selectedRow.board.id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBoardRoleCodes = async () => {
        try {
            const data: BackOfficeBoardRoleCode[] = await getBackOfficeBoardRoleCodes()

            setBoardRoleCodes(data)
            setSelectedBoardRoleCodeId(selectedRow.boardRoleCode.id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMemberRoleCodes = async () => {
        try {
            const data: BackOfficeMemberRoleCode[] = await getBackOfficeMemberRoleCodes();

            setMemberRoleCodes(data);
            setSelectedMemberRoleCodeId(selectedRow.memberRoleCode.id);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBoards().catch(console.error);
        fetchBoardRoleCodes().catch(console.error);
        fetchMemberRoleCodes().catch(console.error);
    }, []);

    return {
        boards,
        boardRoleCodes,
        memberRoleCodes,
        selectedBoardId,
        handleChangeBoardId,
        selectedBoardRoleCodeId,
        handleChangeBoardRoleCodeId,
        selectedMemberRoleCodeId,
        handleChangeMemberRoleCodeId,
        handleClickSubmit
    };
}