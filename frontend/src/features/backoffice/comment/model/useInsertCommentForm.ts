import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../../../shared";
import type {BackOfficeComment, BackOfficeMember, BackOfficePost} from "../../model/type.ts";
import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";
import {getBackOfficePosts} from "../../api/getBackOfficePosts.ts";
import {getBackOfficeComments} from "../../api/getBackOfficeComments.ts";
import {postComment} from "../api/postComment.ts";

export const useInsertCommentForm = () => {

    const [posts, setPosts] = useState<BackOfficePost[]>([]);
    const [members, setMembers] = useState<BackOfficeMember[]>([]);
    const [comments, setComments] = useState<BackOfficeComment[]>([]);
    const [parentComments, setParentComments] = useState<BackOfficeComment[]>();
    const [content, setContent] = useState("");
    const [selectedPostId, setSelectedPostId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();
    const [selectedParentCommentId, setSelectedParentCommentId] = useState<number>();

    const {auth} = useAuth();

    const fetchPosts = async () => {
        try {
            const data:BackOfficePost[] = await getBackOfficePosts();
            setPosts(data);

            if (data.length > 0) {
                setSelectedPostId(data[0].id)

                const parentComments = comments.filter(v => v.post.id === selectedPostId);
                setParentComments(parentComments);
            }
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

    const fetchComments = async () => {
        try {
            const comments: BackOfficeComment[] = await getBackOfficeComments();
            setComments(comments);
        }catch (err) {
            console.error(err);
        }
    }

    const handleChangePostId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedPostId(Number(e.target.value));
    };

    const handleChangeMemberId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedMemberId(Number(e.target.value));
    };

    const handleChangeParentCommentId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedParentCommentId(Number(e.target.value));
    };

    const handleChangeContent = (e:ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement> , fetchPosts: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await postComment({memberId:selectedMemberId, postId: selectedPostId, parentCommentId: selectedParentCommentId, content: content}, auth?.accessToken);
            await fetchPosts();
            handleClickCancel();
        }catch(err) {
            // Todo 에러 처리 필요
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts().catch(console.error);
        fetchMembers().catch(console.error);
        fetchComments().catch(console.error);
    }, []);

    useEffect(() => {
        const parentComments = comments.filter(v => v.post.id === selectedPostId);
        setParentComments(parentComments);
    }, [selectedPostId]);

    return  {
        posts,
        members,
        parentComments,
        content,
        selectedPostId,
        selectedMemberId,
        selectedParentCommentId,
        handleChangePostId,
        handleChangeMemberId,
        handleChangeParentCommentId,
        handleChangeContent,
        handleClickSubmit
    };
}