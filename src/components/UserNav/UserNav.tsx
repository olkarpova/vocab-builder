import { NavLink } from 'react-router-dom';
import css from './UserNav.module.css';
import clsx from 'clsx';

export default function UserNav() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/dictionary"
        className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
      >
        Dictionary
      </NavLink>
      <NavLink
        to="/recommend"
        className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
      >
        Recommend
      </NavLink>
      <NavLink
        to="/training"
        className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
      >
        Training
      </NavLink>
    </nav>
  );
}
