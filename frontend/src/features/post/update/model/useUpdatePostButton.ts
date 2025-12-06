import {useLocation, useNavigate} from "react-router-dom";

export const useUpdatePostButton = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleUpdate = async () => {
        try {
            navigate(`${location.pathname}/edit`);
        }catch (err) {
            console.error(err);
        }
    }

    return { handleUpdate}

}