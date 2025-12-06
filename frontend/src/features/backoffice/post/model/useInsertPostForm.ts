import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../../../shared";
import {postPost} from "../api/postPost.ts";
import type {BackOfficeBoard, BackOfficeMember} from "../../model/type.ts";
import {getBackOfficeBoards} from "../../api/getBackOfficeBoards.ts";
import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";

export const useInsertPostForm = () => {

    const [boards, setBoards] = useState<BackOfficeBoard[]>([]);
    const [members, setMembers] = useState<BackOfficeMember[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();

    const {auth} = useAuth();

    const fetchBoards = async () => {
        try {
            const data:BackOfficeBoard[] = await getBackOfficeBoards();
            setBoards(data);

            if (data.length > 0) setSelectedBoardId(data[0].id);
        }catch (err) {
            console.error(err);
        }
    };

    const fetchMembers = async () => {
        try {
            const data:BackOfficeMember[] = await getBackOfficeMembers();
            setMembers(data);

            if (data.length > 0) setSelectedMemberId(data[0].id);
        }catch (err) {
            console.error(err);
        }
    };

    const handleChangeBoardId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedBoardId(Number(e.target.value));
    };

    const handleChangeMemberId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedMemberId(Number(e.target.value));
    };

    const handleChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement> , fetchPosts: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await postPost({boardId: selectedBoardId, memberId: selectedMemberId, title:title, content:content}, auth?.accessToken);
            await fetchPosts();
            handleClickCancel();
        }catch(err) {
            // Todo 에러 처리 필요
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBoards().catch(console.error);
        fetchMembers().catch(console.error)
    }, []);

    return  {
        boards,
        members,
        title,
        content,
        selectedBoardId,
        selectedMemberId,
        handleChangeBoardId,
        handleChangeMemberId,
        handleChangeTitle,
        setContent,
        handleClickSubmit
    };
}