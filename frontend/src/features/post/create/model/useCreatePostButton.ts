import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {type Board, getBoard} from "../../../../entities/board";
import {useAuth} from "../../../../contexts/AuthContext.tsx";

export const useCreatePostButton = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {categoryCode} = useParams();
    const {user} = useAuth();
    const [board, setBoard] = useState<Board>();

    const handleInsert = () => {
        navigate(`${location.pathname}/post`)
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

    return {user, board, handleInsert};
}