import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import styles from "./Booking.module.css";
import Button from "../UI/Button.jsx";
import Card from "../UI/Card.jsx";
import CardContent from "../UI/CardContent.jsx";

function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimes, setShowTimes] = useState(false);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const availableHours = ["13:00", "14:00", "15:00", "16:00"];

  const handleDateClick = (day) => {
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
    setShowTimes(true);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowTimes(false);
  };

  const handleCloseModal = () => {
    setShowTimes(false);
    setSelectedDate(null); 
  };

  return (
    <div className={styles.calendarContainer}>
      <Card>
        <CardContent>
          <div className={styles.calendarHeader}>
            <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              &lt;
            </Button>
            <h2>{format(currentMonth, "MMMM yyyy")}</h2>
            <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              &gt;
            </Button>
          </div>

          <div className={styles.dayLabels}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className={styles.dayLabel}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendarGrid}>

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className={styles.emptyCell}></div>
            ))}

            {[...Array(daysInMonth)].map((_, index) => (
              <Button
                key={index}
                className={
                  selectedDate &&
                  selectedDate.getDate() === index + 1 &&
                  selectedDate.getMonth() === currentMonth.getMonth()
                    ? styles.selectedDate
                    : ""
                }
                onClick={() => handleDateClick(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {showTimes && (
        <div className={styles.timeModal}>
          <Card>
            <CardContent>
              <h3>Available times for {format(selectedDate, "MMMM dd")}:</h3>
              <div className={styles.timeGrid}>
                {availableHours.map((time, index) => (
                  <Button key={index} onClick={() => handleTimeClick(time)}>
                    {time}
                  </Button>
                ))}
              </div>
              <Button onClick={handleCloseModal}>Close</Button> 
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTime && (
        <p>
          Selected time: {format(selectedDate, "MMMM dd, yyyy")} at{" "}
          {selectedTime}
        </p>
      )}
    </div>
  );
}

export default BookingCalendar;
