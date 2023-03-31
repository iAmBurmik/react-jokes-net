import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink className={({isActive}) => (isActive ? `${styles.active}` : "")} to={"/jokes"}>Jokes</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => (isActive ? `${styles.active}` : "")} to={"/add-joke"}>Add a Joke</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
