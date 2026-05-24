// ============================================================
// TrainList.jsx — Список усіх рейсів із пошуком та фільтрами
//
// Стан компонента:
//   query  — текстовий пошук за маршрутом або номером потяга
//   type   — фільтр за типом потяга
//
// Фільтрація відбувається "в пам'яті" за допомогою filter().
// При кожному вводі в поле — React перерендерить список.
// ============================================================

import { useState } from "react";
import TrainCard from "./TrainCard";
import { trains, getAllCities } from "../data/trains";
import styles from "./TrainList.module.css";

// Отримуємо унікальні типи потягів для select-фільтру
const TYPES = ["Всі типи", ...new Set(trains.map((t) => t.type))];

export default function TrainList() {
  // Локальний стан фільтрів
  const [query,    setQuery]    = useState("");
  const [typeFilter, setType]   = useState("Всі типи");

  // Фільтрація масиву потягів:
  // 1. Перетворюємо пошуковий рядок до нижнього регістру
  // 2. Перевіряємо чи містить маршрут або номер потяга введений текст
  // 3. Додатково фільтруємо за типом (якщо вибраний не "Всі типи")
  const filtered = trains.filter((train) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      train.from.toLowerCase().includes(q) ||
      train.to.toLowerCase().includes(q) ||
      train.number.toLowerCase().includes(q);

    const matchesType =
      typeFilter === "Всі типи" || train.type === typeFilter;

    return matchesQuery && matchesType;
  });

  function handleReset() {
    setQuery("");
    setType("Всі типи");
  }

  return (
    <div className={styles.wrapper}>
      {/* ---- Панель пошуку та фільтрів ---- */}
      <div className={styles.searchBar}>
        {/* Текстовий пошук */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>🔍 Пошук</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Місто або номер потяга..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Фільтр за типом */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>🚆 Тип потяга</label>
          <select
            className={styles.select}
            value={typeFilter}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Кнопка скидання фільтрів */}
        <button className={styles.resetBtn} onClick={handleReset}>
          Скинути фільтри
        </button>
      </div>

      {/* ---- Кількість результатів ---- */}
      <div className={styles.resultsHeader}>
        <p className={styles.resultsCount}>
          Знайдено: <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "рейс" : "рейси / рейсів"}
        </p>
      </div>

      {/* ---- Картки або порожній стан ---- */}
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <p className={styles.emptyTitle}>Рейсів не знайдено</p>
          <p>Спробуйте змінити параметри пошуку</p>
        </div>
      )}
    </div>
  );
}
