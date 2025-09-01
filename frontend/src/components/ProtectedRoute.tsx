import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return children;
}

export default ProtectedRoute