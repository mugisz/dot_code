import { Link, useLocation } from "react-router-dom";
import { HEADER_LINKS } from "../../constants/header";
import styles from "./Header.module.css";

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        {HEADER_LINKS.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`${styles.linkItem} ${
                pathname === link.path ? styles.active : ""
              }`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
