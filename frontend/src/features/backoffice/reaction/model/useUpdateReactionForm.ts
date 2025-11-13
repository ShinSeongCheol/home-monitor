import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type {
    BackOfficeComment,
    BackOfficeMember,
    BackOfficePost,
    BackOfficeReaction,
    BackOfficeReactionCode
} from "../../model/type.ts";
import {useAuth} from "../../../../shared";
import {getBackOfficePosts} from "../../api/getBackOfficePosts.ts";
import {getBackOfficeComments} from "../../api/getBackOfficeComments.ts";
import {getBackOfficeMembers} from "../../api/getBackOfficeMembers.ts";
import {getBackOfficeReactionCodes} from "../../api/getBackOfficeReactionCodes.ts";
import {putReaction} from "../api/putReaction.ts";

export const useUpdateReactionForm = (data: BackOfficeReaction) => {

    const [posts, setPosts] = useState<BackOfficePost[]>([]);
    const [comments, setComments] = useState<BackOfficeComment[]>([]);
    const [members, setMembers] = useState<BackOfficeMember[]>([]);
    const [reactionCodes, setReactionCodes] = useState<BackOfficeReactionCode[]>([]);

    const [selectedPostId, setSelectedPostId] = useState<number>();
    const [selectedCommentId, setSelectedCommentId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();
    const [selectedReactionCodeId, setSelectedReactionCodeId] = useState<number>();

    const {auth} = useAuth();

    const fetchPosts = async () => {
        try {
            const posts: BackOfficePost[] = await getBackOfficePosts();
            setPosts(posts);

            if (posts.length > 0) setSelectedPostId(data.post.id);
        }catch (err) {
            console.error(err);
        }
    };

    const fetchComments = async () => {
        try {
            const comments: BackOfficeComment[] = await getBackOfficeComments();
            setComments(comments.filter(v => v.post.id === selectedPostId));

            if (comments.length > 0) setSelectedCommentId(data.comment.id)
        }catch (err) {
            console.error(err);
        }
    };

    const fetchMembers = async () => {
        try {
            const members: BackOfficeMember[] = await getBackOfficeMembers();
            setMembers(members);

            if (members.length > 0) setSelectedMemberId(data.member.id);
        }catch (err) {
            console.error(err);
        }
    };

    const fetchReactionCodes = async () => {
        try {
            const reactionCodes: BackOfficeReactionCode[] = await getBackOfficeReactionCodes();
            setReactionCodes(reactionCodes);

            if (reactionCodes.length > 0) setSelectedReactionCodeId(data.reactionCode.id);
        }catch (err) {
            console.error(err);
        }
    };

    const handleChangePostId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedPostId(Number(e.target.value));
    };

    const handleChangeCommentId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedCommentId(Number(e.target.value));
    };

    const handleChangeMemberId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedMemberId(Number(e.target.value));
    };

    const handleChangeReactionCodeId = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedReactionCodeId(Number(e.target.value));
    };

    const handleClickSubmit = async (e: FormEvent<HTMLFormElement>, fetchReactions: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            await putReaction(data.id, {memberId: selectedMemberId, postId: selectedPostId, commentId: selectedCommentId ?? 0, reactionCodeId: selectedReactionCodeId}, auth?.accessToken);
            await fetchReactions();
            handleClickCancel();
        }catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts().catch(console.error)
        fetchComments().catch(console.error)
        fetchMembers().catch(console.error)
        fetchReactionCodes().catch(console.error)
    }, []);

    useEffect(() => {
        fetchComments().catch(console.error)
    }, [selectedPostId]);

    return {
        posts,
        selectedPostId,
        handleChangePostId,
        comments,
        selectedCommentId,
        handleChangeCommentId,
        members,
        selectedMemberId,
        handleChangeMemberId,
        reactionCodes,
        selectedReactionCodeId,
        handleChangeReactionCodeId,
        handleClickSubmit
    };
}