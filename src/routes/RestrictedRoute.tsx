import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

interface RestrictedRouteProps {
    children: React.ReactNode;
}

export default function RestrictedRoute({ children }: RestrictedRouteProps) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing);
    
    if (isRefreshing) {
        return <p>Loading..</p>
    }
    return isLoggedIn ? < Navigate to="/dictionary" /> : <>{children}</>
}