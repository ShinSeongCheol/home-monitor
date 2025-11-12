import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {useAuth} from "../../../../shared";
import type {BackOfficeComment, BackOfficeMember, BackOfficePost} from "../../model/type.ts";
import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";
import {getBackOfficePosts} from "../../api/getBackOfficePosts.ts";
import {getBackOfficeComments} from "../../api/getBackOfficeComments.ts";
import {putComment} from "../api/putComment.ts";

export const useUpdateCommentForm = (data: BackOfficeComment) => {

    const [posts, setPosts] = useState<BackOfficePost[]>([]);
    const [members, setMembers] = useState<BackOfficeMember[]>([]);
    const [comments, setComments] = useState<BackOfficeComment[]>([]);
    const [parentComments, setParentComments] = useState<BackOfficeComment[]>();
    const [content, setContent] = useState(data.content);
    const [selectedPostId, setSelectedPostId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>(data.member.id);
    const [selectedParentCommentId, setSelectedParentCommentId] = useState<number>();

    const {auth} = useAuth();

    const fetchPosts = async () => {
        try {
            const posts:BackOfficePost[] = await getBackOfficePosts();
            setPosts(posts);

            if (posts.length > 0) {
                setSelectedPostId(data.post.id)

                const parentComments = comments.filter(v => v.post.id === selectedPostId);
                setParentComments(parentComments);
                setSelectedParentCommentId(data.parentComment?.id);
            }
        }catch (err) {
            console.error(err);
        }
    };

    const fetchMembers = async () => {
        try {
            const data:BackOfficeMember[] = await getBackOfficeMembers();
            setMembers(data);
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
            await putComment(data.id, {memberId: selectedMemberId, postId: selectedPostId, parentCommentId: selectedParentCommentId === 0 ? null : selectedParentCommentId, content: content}, auth?.accessToken);
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
    }, [data]);

    useEffect(() => {
        const parentComments = comments.filter(v => v.post.id === selectedPostId);
        setParentComments(parentComments);
    }, [selectedPostId]);

    return  {
        posts,
        members,
        content,
        parentComments,
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