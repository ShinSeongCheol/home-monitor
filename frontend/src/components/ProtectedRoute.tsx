import {Navigate, useLocation} from "react-router-dom";
import {type JSX} from "react";
import {useAuth} from "../shared";

const ProtectedRoute = ({children}: { children: JSX.Element }) => {

    const {auth} = useAuth();
    const location = useLocation();

    if (!auth) {
        alert("로그인이 필요합니다.");
        return <Navigate to={'/auth/login'} replace/>;
    }

    // 관리자 페이지 접근 관리
    const adminLocation = ['/configuration/forecast/administrativeDistrict', '/configuration/forecast/AreaDistrict']
    if (!auth.authorities?.includes({authority: "ROLE_ADMIN"})) {
        if (adminLocation.includes(location.pathname)) {
            alert("권한이 없습니다.");
            return <Navigate to={'/'} replace/>
        }
    }

    return children;
}

export default ProtectedRoute