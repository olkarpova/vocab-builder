import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { logOut } from "../../redux/auth/authOperations";
import css from "./UserBar.module.css";

export default function UserBar() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);

    const hangleLogout = () => {
        dispatch(logOut());
    };

    return (
        <div className={css.userBar}>
            <span className={css.userName}>{user?.name}</span>
            <button className={css.logoutBtn} onClick={hangleLogout}>
                Log out
            </button>
        </div>
    )
}