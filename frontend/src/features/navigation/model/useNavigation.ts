import {useAuth} from "../../../shared";
import {useLocation} from "react-router-dom";

export const useNavigation = () => {

    const {auth} = useAuth();
    const location = useLocation();

    return {auth, location};
}