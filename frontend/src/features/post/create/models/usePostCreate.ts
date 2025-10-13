import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { useState, type ChangeEventHandler, type FormEventHandler } from "react";
import { postBoard } from "../../../../entities/board";

export const usePostCreate = () => {
    const { accessToken } = useAuth();

    const navigate = useNavigate();
    const { categoryCode } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //title 변경
    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    }

    // 게시판 등록
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        postBoard(categoryCode, accessToken, {
            title: title,
            content: content
        })
        .then(_data => {
            alert('글 등록 되었습니다.');
            navigate(-1);
        })
        .catch(err => console.error(err));
    }

    const goBack = () => {
        navigate(-1);
    }

    return {title, content, handleSubmit, handleTitleChange, setContent, goBack}
}