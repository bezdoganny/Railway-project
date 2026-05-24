// ============================================================
// SeatMap.jsx — Інтерактивна схема місць вагону
//
// Відображає сітку місць із трьома станами:
//   🟢 вільне    — можна обрати
//   🔵 обране    — вибране користувачем (клік знімає вибір)
//   🔴 заброньоване — недоступне
//
// Місця, які вже є в localStorage (bookedSeats з даних вагону)
// + місця з нових бронювань з контексту = недоступні.
//
// Логіка вибору місць зберігається в useBooking (useReducer).
// ============================================================

import { useBooking } from "../context/BookingContext";
import styles from "./SeatMap.module.css";

export default function SeatMap({ wagon, basePrice }) {
  const { state, toggleSeat } = useBooking();

  // Якщо вагон не вибрано — показуємо підказку
  if (!wagon) {
    return (
      <div className={styles.section}>
        <p className={styles.sectionTitle}>💺 Схема місць</p>
        <div className={`${styles.wagon} ${styles.placeholder}`}>
          ← Оберіть вагон вище, щоб побачити доступні місця
        </div>
      </div>
    );
  }

  const totalSeats = wagon.totalSeats;
  const bookedSeats = wagon.bookedSeats;
  const selectedSeats = state.selectedSeats;
  const price = Math.round(basePrice * wagon.priceMultiplier);

  // Генеруємо масив усіх номерів місць від 1 до totalSeats
  const allSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  function getSeatStatus(num) {
    if (bookedSeats.includes(num)) return "booked";
    if (selectedSeats.includes(num)) return "selected";
    return "free";
  }

  function handleSeatClick(num) {
    // Не можна клікати на заброньовані місця
    if (bookedSeats.includes(num)) return;
    toggleSeat(num);
  }

  const totalCost = selectedSeats.length * price;

  return (
    <div className={styles.section}>
      <p className={styles.sectionTitle}>
        💺 Схема місць — Вагон {wagon.number} ({wagon.type})
      </p>

      {/* Легенда */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.free}`} />
          Вільне
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.selected}`} />
          Обране
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.booked}`} />
          Заброньоване
        </span>
      </div>

      {/* Сітка місць */}
      <div className={styles.wagon}>
        <div className={styles.seatsGrid}>
          {allSeats.map((num) => {
            const status = getSeatStatus(num);
            return (
              <button
                key={num}
                className={`${styles.seat} ${styles[status]}`}
                onClick={() => handleSeatClick(num)}
                title={
                  status === "booked"
                    ? `Місце ${num} — заброньоване`
                    : `Місце ${num} — ${status === "selected" ? "обране" : "вільне"}`
                }
                disabled={status === "booked"}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Інфо про обрані місця */}
      {selectedSeats.length > 0 && (
        <div className={styles.selectedInfo}>
          <span>Обрані місця:</span>
          <div className={styles.selectedSeats}>
            {[...selectedSeats].sort((a, b) => a - b).map((s) => (
              <span key={s} className={styles.seatTag}>{s}</span>
            ))}
          </div>
          <span style={{ marginLeft: "auto", fontWeight: 700 }}>
            Разом: {totalCost} ₴
          </span>
        </div>
      )}
    </div>
  );
}
