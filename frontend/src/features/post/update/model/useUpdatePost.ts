import {useEffect, useState, type ChangeEventHandler, type FormEventHandler} from "react";
import {useAuth} from "../../../../contexts/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {sanitize} from "../../../../shared";
import {updatePost} from "../api/updatePost";
import {getPost} from "../../../../entities/post/api/getPost.ts";

export const useUpdatePost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {accessToken} = useAuth();

    const navigate = useNavigate();
    const {categoryCode, postId} = useParams();

    const fetchPost = async () => {
        try {
            const data = await getPost(categoryCode, postId);
            const santiizedContent = sanitize(data.content, {
                ADD_TAGS: ["iframe"],
                ADD_ATTR: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
            });

            setTitle(sanitize(data.title));
            setContent(santiizedContent);

        } catch (err) {
            console.error(err);
        }
    }

    //title 변경
    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    }

    // 게시판 수정
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            await updatePost(categoryCode, postId, title, content, accessToken);
            alert('글 수정 되었습니다.');
            navigate(-1);
        } catch (err) {
            console.error(err);
        }

    }

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        void fetchPost();
    }, [])

    return {title, content, handleSubmit, handleTitleChange, setContent, handleCancel};
}