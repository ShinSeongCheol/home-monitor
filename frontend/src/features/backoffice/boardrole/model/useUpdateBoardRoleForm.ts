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
import {updateBoardRole} from "../api/updateBoardRole.ts";

export const useUpdateBoardRoleForm = (data: BackOfficeBoardRole) => {

    const [boards, setBoards] = useState<BackOfficeBoard[]>([]);
    const [boardRoleCodes, setBoardRoleCodes] = useState<BackOfficeBoardRoleCode[]>([]);
    const [memberRoleCodes, setMemberRoleCodes] = useState<BackOfficeMemberRoleCode[]>([]);

    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedBoardRoleCodeId, setSelectedBoardRoleCodeId] = useState<number>();
    const [selectedMemberRoleCodeId, setSelectedMemberRoleCodeId] = useState<number>();

    const {auth} = useAuth();


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

        try {
            await updateBoardRole(data.id, {
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
            const boards: BackOfficeBoard[] = await getBackOfficeBoards();

            setBoards(boards);
            setSelectedBoardId(data.board.id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBoardRoleCodes = async () => {
        try {
            const boardRoleCodes: BackOfficeBoardRoleCode[] = await getBackOfficeBoardRoleCodes()

            setBoardRoleCodes(boardRoleCodes)
            setSelectedBoardRoleCodeId(data.boardRoleCode.id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMemberRoleCodes = async () => {
        try {
            const memberRoleCodes: BackOfficeMemberRoleCode[] = await getBackOfficeMemberRoleCodes();

            setMemberRoleCodes(memberRoleCodes);
            setSelectedMemberRoleCodeId(data.memberRoleCode.id);
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