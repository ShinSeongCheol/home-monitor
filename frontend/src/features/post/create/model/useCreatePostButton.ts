import {useLocation, useNavigate} from "react-router-dom";


export const useCreatePostButton = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleInsert = () => {
        navigate(`${location.pathname}/post`)
    }

    return {handleInsert};
}