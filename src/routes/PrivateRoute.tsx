import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);

    if (isRefreshing) {
        return <p>Loading..</p>
    }

    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}