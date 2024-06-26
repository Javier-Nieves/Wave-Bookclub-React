import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useLibrary } from "../features/book/useLibrary";
import { useUpdateBook } from "../features/book/useUpdateBook";
import { useViews } from "../contexts/ViewsContext";
import { CLASSIC_LIMIT } from "../utils/config";
import Button from "./Button";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Upcoming.module.css";

export default function Upcoming() {
  const [date, setDate] = useState();
  const { changeBook } = useUpdateBook();
  const { upcomingBook } = useLibrary();
  const { message, showMessage } = useViews();
  const navigate = useNavigate();

  const isModern = upcomingBook?.year > CLASSIC_LIMIT;
  let fontSize;
  if (isModern)
    fontSize = upcomingBook?.title?.length > 15 ? "2.5rem" : "3.5rem";
  else fontSize = upcomingBook?.title?.length > 15 ? "2.5rem" : "3.5rem";
  const fontFamily = isModern ? "var(--font-modern)" : "var(--font-classic)";

  function handleChangeDate(e) {
    e.preventDefault();
    if (!date) return;
    changeBook({
      id: upcomingBook._id,
      type: "Date",
      data: { meetingDate: date },
    });
    !message && showMessage("Meeting date is selected", "good");
  }

  let formattedDate;
  // transform meeting date
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
      style={{ fontFamily }}
      onClick={() =>
        upcomingBook && navigate(`/app/book/${upcomingBook.bookid}`)
      }
    >
      <div>
        <h1 className={styles.upcomingTitle} style={{ fontSize, fontFamily }}>
          {upcomingBook?.title || "Choose the next book ➡"}
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
          src={upcomingBook?.image_link || "/img/rate1.webp"}
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
                  className={styles.picker}
                  onChange={(date) => setDate(date)}
                  selected={date}
                  dateFormat="dd/MM/yy"
                  placeholderText="Date"
                />
                <Button type="blackBtn">Add</Button>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
}
