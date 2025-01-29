import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import styles from "./Booking.module.css"; 
import Button from "../UI/Button.jsx";
import Card from "../UI/Card.jsx";
import CardContent from "../UI/CardContent.jsx";

function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  return (
    <div className={styles.calendarContainer}>
      <Card>
        <CardContent>
          <div className={styles.calendarHeader}>
            <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</Button>
            <h2>{format(currentMonth, "MMMM yyyy")}</h2>
            <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</Button>
          </div>
          <div className={styles.calendarGrid}>
            {[...Array(daysInMonth)].map((_, index) => (
              <Button
                key={index}
                className={
                  selectedDate && selectedDate.getDate() === index + 1 ? styles.selectedDate : ""
                }
                onClick={() => handleDateClick(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingCalendar;
