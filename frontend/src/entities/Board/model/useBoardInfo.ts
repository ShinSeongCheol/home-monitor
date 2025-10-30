import {useLocation, useNavigate} from "react-router-dom";


export const useBoardInfo = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (postId: number) => {
        navigate(`${location.pathname}/${postId}`);
    }

    return {handleClick}
}