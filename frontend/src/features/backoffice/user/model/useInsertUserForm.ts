import {type ChangeEvent, type FormEvent, useState} from "react";
import {postUser} from "../api/postUser.ts";
import {useAuth} from "../../../../shared";

export const useInsertUserForm = () => {

    const {auth} = useAuth();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    };

    const handleClickSubmit = async (e:FormEvent<HTMLFormElement>, fetchUsers: () => Promise<void>, handleClickCancel: () => void) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                alert('비밀번호를 확인해주세요.');
                return;
            }

            await postUser({email:email, username:username, password:password}, auth?.accessToken);
            await fetchUsers();
            handleClickCancel();
        }catch (err) {
            console.error(err);
        }
    };

    return {
        email,
        handleChangeEmail,
        username,
        handleChangeUsername,
        password,
        handleChangePassword,
        confirmPassword,
        handleChangeConfirmPassword,
        handleClickSubmit,
    }
}