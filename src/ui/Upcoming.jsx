import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useBooks } from "../contexts/BooksContext";
import { CLASSIC_LIMIT } from "../utils/config";

import Button from "./Button";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Upcoming.module.css";

export default function Upcoming() {
  const { upcomingBook, addBookDate } = useBooks();
  const navigate = useNavigate();
  const [date, setDate] = useState();

  const isModern = upcomingBook?.year > CLASSIC_LIMIT;
  let fontSize;
  if (isModern)
    fontSize = upcomingBook?.title?.length > 15 ? "2.5rem" : "3.5rem";
  else fontSize = upcomingBook?.title?.length > 15 ? "2.5rem" : "3.5rem";
  const fontFamily = isModern ? "var(--font-modern)" : "var(--font-classic)";

  function handleChangeDate(e) {
    e.preventDefault();
    addBookDate(date);
  }

  // transform meeting date
  let formattedDate;
  if (upcomingBook?.meeting_date) {
    const dateString = upcomingBook.meeting_date;
    const meetDate = new Date(dateString);
    const day = meetDate.getDate().toString().padStart(2, "0");
    const month = (meetDate.getMonth() + 1).toString().padStart(2, "0");
    const year = meetDate.getFullYear().toString().slice(-2);
    formattedDate = `${day}.${month}.${year}`;
  }

  return (
    <div
      className={isModern ? styles.modernBack : styles.classicBack}
      style={{
        fontFamily,
      }}
      onClick={() =>
        upcomingBook && navigate(`/app/book/${upcomingBook.bookid}`)
      }
    >
      <div>
        <h1
          className={styles.upcomingTitle}
          style={{
            fontSize,
            fontFamily,
          }}
        >
          {upcomingBook?.title || "Choose the next book"}
        </h1>
        {upcomingBook && (
          <h3
            style={{
              fontSize: upcomingBook?.author?.length > 12 ? "1.5rem" : "2rem",
            }}
          >
            {upcomingBook?.author}, {upcomingBook.year}
          </h3>
        )}
        <img
          className={styles.upcomingPic}
          src={upcomingBook?.image_link || "/public/img/club2.png"}
          loading="lazy"
          alt="upcoming book"
        />
      </div>

      {upcomingBook && (
        <>
          <div>{formattedDate ? "Meeting date:" : "Select meeting date:"}</div>
          <form
            className={styles.addDateContainer}
            onSubmit={handleChangeDate}
            onClick={(e) => e.stopPropagation()}
          >
            {formattedDate && (
              <div className={styles.meeting_date}>{formattedDate}</div>
            )}
            {!formattedDate && (
              <>
                <DatePicker
                  onChange={(date) => setDate(date)}
                  selected={date}
                  dateFormat="dd/MM/yy"
                  className={styles.picker}
                />
                <Button type="meetingBtn">Add</Button>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
}
