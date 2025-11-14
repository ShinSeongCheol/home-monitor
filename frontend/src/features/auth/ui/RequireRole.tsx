import {useAuth} from "../../../shared";
import {hasAccess} from "../lib/hasAccess.ts";
import {Navigate} from "react-router-dom";

type RequireRoleProps = {
    children: React.JSX.Element;
    roles: string[];
}

export const RequireRole = ({children, roles}: RequireRoleProps) => {
    const {auth} = useAuth();

    if (!auth) return <Navigate to="/auth/login" replace />;
    const isAccess = hasAccess(auth, roles);
    if (!isAccess) return <Navigate to="/auth/login" replace />;

    return children;
}