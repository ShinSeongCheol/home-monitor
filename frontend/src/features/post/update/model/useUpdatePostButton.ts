import {useAuth} from "../../../../contexts/AuthContext.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {type Board, getBoard} from "../../../../entities/board";

export const useUpdatePostButton = () => {

    const {user} = useAuth();
    const {categoryCode} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [board, setBoard] = useState<Board>();

    const handleUpdate = async () => {
        try {
            navigate(`${location.pathname}/edit`);
        }catch (err) {
            console.error(err);
        }
    }

    const fetchBoard = async () => {
        try {
            const data = await getBoard(categoryCode)
            setBoard(data);
        }catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        void fetchBoard();
    }, []);

    return {user, board, handleUpdate}

}