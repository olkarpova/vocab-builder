import { Outlet } from "react-router-dom";
import css from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>VocabBuilder</div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
}