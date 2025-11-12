import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../../../shared";
import {putPost} from "../api/putPost.ts";
import type {BackOfficeBoard, BackOfficeMember, BackOfficePost} from "../../model/type.ts";
import {getBackOfficeBoards} from "../../api/getBackOfficeBoards.ts";
import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";

export const useUpdatePostForm = (data: BackOfficePost) => {

    const [boards, setBoards] = useState<BackOfficeBoard[]>([]);
    const [members, setMembers] = useState<BackOfficeMember[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();

    const {auth} = useAuth();

    const fetchBoards = async () => {
        try {
            const boards:BackOfficeBoard[] = await getBackOfficeBoards();
            setBoards(boards);

            setSelectedBoardId(data.board.id);
        }catch (err) {
            console.error(err);
        }
    };

    const fetchMembers = async () => {
        try {
            const members:BackOfficeMember[] = await getBackOfficeMembers();
            setMembers(members);

            setSelectedMemberId(data.member.id);
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

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchBoard: () => Promise<void>, handleClickCancel: () => void ) => {
        e.preventDefault();

        await putPost(data.id, {boardId: selectedBoardId, memberId: selectedMemberId, title: title, content: content}, auth?.accessToken).catch(console.error);
        await fetchBoard();
        handleClickCancel();
    };

    useEffect(() => {
        fetchBoards().catch(console.error);
        fetchMembers().catch(console.error);
        setTitle(data.title);
        setContent(data.content);
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