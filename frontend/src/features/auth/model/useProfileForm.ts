import {type ChangeEvent, type FormEvent, useState} from "react";
import {useAuth} from "../../../shared";
import {useNavigate} from "react-router-dom";
import {putProfile} from "../api/putProfile.ts";

export const useProfileForm = () => {

    const {auth} = useAuth();
    const navigate = useNavigate();

    const [email] = useState(auth?.email);
    const [nickname, setNickname] = useState(auth?.name);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");

    const handleChangeNickname = (e:ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleChangeNewPassword = (e:ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleChangeConfirmNewPassword = (e:ChangeEvent<HTMLInputElement>) => {
        setNewConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e:FormEvent<Element>) => {
        e.preventDefault();

        if(newPassword !== newConfirmPassword) {
            alert('입력한 새 비밀번호가 서로 다릅니다');
        }

        if(!auth) return;

        const res = await putProfile({email: email, name: auth.name, nickname: nickname, password: password, newPassword: newPassword, accessToken: auth.accessToken})

        if(!res.ok) {
            console.error(res.status);
        }

        alert('비밀번호가 변경되었습니다.');
        navigate('/');
    };

    return {email, nickname, handleChangeNickname, handleChangePassword, handleChangeNewPassword, handleChangeConfirmNewPassword, handleSubmit};
}