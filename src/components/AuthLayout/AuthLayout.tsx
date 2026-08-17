import { Outlet } from "react-router-dom";
import css from "./AuthLayout.module.css";
import logo from "../../assets/icons/logo.svg"

export default function AuthLayout() {
  return (
    <div className={css.wrapper}>
          <div className={css.logo}>
              < img src={logo} alt="" className={ css.logoIcon} />
              VocabBuilder
          </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
}