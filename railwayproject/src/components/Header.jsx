// ============================================================
// Header.jsx — Шапка застосунку
//
// Містить логотип та навігаційні посилання.
// Використовує NavLink із react-router-dom для автоматичного
// виділення активного маршруту (клас "active").
// ============================================================

import { NavLink } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import styles from "./Header.module.css";

export default function Header() {
  const { state } = useBooking();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Логотип */}
        <NavLink to="/" className={styles.logo}>
          <div className={styles.logoIcon}>🚄</div>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>УкрЗалізниця</span>
            <span className={styles.logoSub}>Квитки онлайн</span>
          </div>
        </NavLink>

        {/* Навігація */}
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Рейси
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Мої квитки
            {state.bookings.length > 0 && (
              <span className={styles.badge}>{state.bookings.length}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
