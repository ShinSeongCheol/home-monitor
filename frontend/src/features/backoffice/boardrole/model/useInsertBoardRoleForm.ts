import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type {
    BackOfficeBoard,
    BackOfficeBoardRoleCode,
    BackOfficeMemberRoleCode
} from "../../model/type.ts";
import {getBackOfficeBoards} from "../../api/getBackOfficeBoards.ts";
import {getBackOfficeBoardRoleCodes} from "../../api/getBackOfficeBoardRoleCodes.ts";
import {getBackOfficeMemberRoleCodes} from "../../api/getBackOfficeMemberRoleCodes.ts";
import {postBoardRole} from "../api/postBoardRole.ts";
import {useAuth} from "../../../../shared";

export const useInsertBoardRoleForm = () => {

    const [boards, setBoards] = useState<BackOfficeBoard[]>([]);
    const [boardRoleCodes, setBoardRoleCodes] = useState<BackOfficeBoardRoleCode[]>([]);
    const [memberRoleCodes, setMemberRoleCodes] = useState<BackOfficeMemberRoleCode[]>([]);

    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedBoardRoleCodeId, setSelectedBoardRoleCodeId] = useState<number>();
    const [selectedMemberRoleCodeId, setSelectedMemberRoleCodeId] = useState<number>();

    const {auth} = useAuth();

    const handleChangeBoardId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedBoardId(Number(e.target.value));
    }

    const handleChangeBoardRoleCodeId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedBoardRoleCodeId(Number(e.target.value));
    }

    const handleChangeMemberRoleCodeId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedMemberRoleCodeId(Number(e.target.value));
    }

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchBoardRoles: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await postBoardRole({boardId: selectedBoardId, boardRoleCodeId: selectedBoardRoleCodeId, memberRoleCodeId: selectedMemberRoleCodeId}, auth?.accessToken);
            await fetchBoardRoles();
            handleClickCancel();
        }catch (err) {
            console.error(err);
        }
    }

    const fetchBoards = async () => {
        try {
            const data:BackOfficeBoard[] = await getBackOfficeBoards();
            setBoards(data);

            if (data.length > 0) setSelectedBoardId(data[0].id);
        }catch (err) {
            console.error(err);
        }
    };

    const fetchBoardRoleCodes = async () => {
        try {
            const data:BackOfficeBoardRoleCode[] = await getBackOfficeBoardRoleCodes()
            setBoardRoleCodes(data)

            if (data.length > 0) setSelectedBoardRoleCodeId(data[0].id);
        }catch (err) {
            console.error(err);
        }
    };

    const fetchMemberRoleCodes = async () => {
        try {
            const data:BackOfficeMemberRoleCode[] = await getBackOfficeMemberRoleCodes();
            setMemberRoleCodes(data);

            if (data.length > 0) setSelectedMemberRoleCodeId(data[0].id);
        }catch (err) {
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