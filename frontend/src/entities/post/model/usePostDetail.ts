import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import type { Post } from "./type";
import { sanitize } from "../../../shared";
import { getPost } from "../api/getPost";

export const usePostDetail = () => {
    const [post, setPost] = useState<Post>();

    const { categoryCode, postId } = useParams();

    const fetchPost = async () => {
        const data = await getPost(categoryCode, postId);

        const sanitizedContent = sanitize(data.content, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
        });

        setPost({
            title: data.title,
            content: sanitizedContent,
            view: data.number,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            member: {
                email: data.member.email,
                nickname: data.member.nickname,
            },
        })
    }

    useEffect(() => {
        void fetchPost();
    }, [])

    return {post, setPost};
}