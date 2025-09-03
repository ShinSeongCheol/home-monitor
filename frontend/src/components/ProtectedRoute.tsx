import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { type JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>로딩중...</div>;
    }
    
    if(!user) {
        alert("로그인이 필요합니다.");
        return <Navigate to={'/auth'} replace />; 
    }

    // 관리자 페이지 접근 관리
    const adminLocation = ['/configuration/forecast/administrativeDistrict', '/configuration/forecast/AreaDistrict']
    if (!user.authorities?.includes("ROLE_ADMIN")) {
        if (adminLocation.includes(location.pathname)) {
            alert("권한이 없습니다.");
            return <Navigate to={'/'} replace />
        }
    }

    return children;
}

export default ProtectedRoute