import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    if (!isAuthenticated) {
        alert("권한이 없습니다.");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute