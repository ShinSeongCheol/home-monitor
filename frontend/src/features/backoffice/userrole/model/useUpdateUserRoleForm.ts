import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type {BackOfficeMember, BackOfficeMemberRole, BackOfficeMemberRoleCode} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";
import {getBackOfficeUserRoleCodes} from "../../api/getBackOfficeUserRoleCodes.ts";
import {putUserRole} from "../api/putUserRole.ts";

export const useUpdateUserRoleForm = (data: BackOfficeMemberRole) => {

    const {auth} = useAuth();

    const [users, setUsers] = useState<BackOfficeMember[]>([]);
    const [userRoleCodes, setUserRoleCodes] = useState<BackOfficeMemberRoleCode[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const [selectedUserRoleCodeId, setSelectedUserRoleCodeId] = useState<number>();

    const fetchUsers = async () => {
        try {
            const users: BackOfficeMember[] = await getBackOfficeMembers();
            setUsers(users);

            if(users.length > 0) setSelectedUserId(data.member.id);
        }catch (err) {
            console.error(err);
        }
    }

    const fetchUserRoleCodes = async () => {
        try {
            const userRoleCodes: BackOfficeMemberRoleCode[] = await getBackOfficeUserRoleCodes();
            setUserRoleCodes(userRoleCodes);

            if(userRoleCodes.length > 0) setSelectedUserRoleCodeId(data.memberRoleCode.id);
        }catch (err) {
            console.error(err);
        }
    }

    const handleChangeSelectedUserId = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(Number(e.target.value))
    };

    const handleChangeSelectedUserRoleCodeId = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserRoleCodeId(Number(e.target.value))
    };

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchUserRoles: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await putUserRole(data.id, {memberId: selectedUserId, memberRoleCodeId: selectedUserRoleCodeId}, auth?.accessToken);
            await fetchUserRoles();
            handleClickCancel();
        }catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers().catch(console.error);
        fetchUserRoleCodes().catch(console.error);
    }, []);

    return {
        users,
        userRoleCodes,
        selectedUserId,
        handleChangeSelectedUserId,
        selectedUserRoleCodeId,
        handleChangeSelectedUserRoleCodeId,
        handleClickSubmit,
    }
}