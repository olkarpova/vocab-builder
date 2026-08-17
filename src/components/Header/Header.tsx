import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import logo from '../../assets/icons/logo.svg';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/dictionary" className={css.logo}>
          <img src={logo} alt="" className={css.logoIcon} />
          VocabBuilder
        </NavLink>
        <UserNav />
        <UserBar />
      </div>
    </header>
  );
}
