import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { lt } from "date-fns/locale";
import styles from "./Booking.module.css";
import Button from "../UI/Button.jsx";
import Card from "../UI/Card.jsx";
import CardContent from "../UI/CardContent.jsx";
import { getAvailableTimes, addAvailableTimes } from "../../firebase";
import { auth, checkIfAdmin } from "../../firebase";

function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimes, setShowTimes] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [newTimes, setNewTimes] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state to show loading indicator

  // Check if the logged-in user is the admin (based on email)
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setIsAdmin(checkIfAdmin());  // Check if the logged-in user is admin
    } else {
      setIsAdmin(false);  // User is not logged in
    }
  }, [auth.currentUser]);

  // Fetch available times from the backend
  const fetchAvailableTimes = async (date) => {
    setLoading(true); // Start loading
    try {
      const times = await getAvailableTimes(date);
      setAvailableTimes(times);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([]); // In case of error, set available times to empty
    } finally {
      setShowTimes(true);  // Show available times after fetch
      setLoading(false); // Stop loading after fetching
    }
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay() + 6 % 7;

  // Handle date click to show available times for admin or regular user
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowTimes(false);  // Reset showTimes when selecting a new date
    setAvailableTimes([]);  // Clear previous available times

    // For Admin, fetch available times when they click the date
    if (isAdmin) {
      fetchAvailableTimes(format(clickedDate, "yyyy-MM-dd"));
    } else {
      // For regular user, just fetch available times
      fetchAvailableTimes(format(clickedDate, "yyyy-MM-dd"));
    }
  };

  // Handle time click to select a time
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowTimes(false);  // Close the times modal once time is selected
  };

  const handleCloseModal = () => {
    setShowTimes(false);
    setSelectedDate(null);
  };

  // Add new times (only for admin)
  const handleAddTimes = async () => {
    const date = format(selectedDate, "yyyy-MM-dd");
    const timesArray = newTimes.split(",").map((time) => time.trim());
    await addAvailableTimes(date, timesArray);
    setNewTimes("");
    alert("Times added successfully!");
  };

  // Show available times after Admin clicks "Add Times" button
  const handleShowAvailableTimes = () => {
    fetchAvailableTimes(format(selectedDate, "yyyy-MM-dd"));
    setShowTimes(true); // Only show times when Add Times button is clicked
  };

  return (
    <div className={styles.calendarContainer}>
      <Card>
        <CardContent>
          <div className={styles.calendarHeader}>
            <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              &lt;
            </Button>
            <h2>{format(currentMonth, "MMMM yyyy", { locale: lt }).replace(/^\w/, (c) => c.toUpperCase())}</h2>
            <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              &gt;
            </Button>
          </div>

          <div className={styles.dayLabels}>
            {["Pir", "Ant", "Tre", "ket", "Pen", "Ses", "Sek"].map((day) => (
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

      {loading && <div className={styles.loadingIndicator}>Loading...</div>}

      {showTimes && (
        <div className={styles.timeModal}>
          <Card>
            <CardContent>
              <h3 className={styles.timeTitle}>Available times for {format(selectedDate, "MMMM dd", { locale: lt }).replace(/^\w/, (c) => c.toUpperCase())}:</h3>
              <div className={styles.timeGrid}>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time, index) => (
                    <div key={index} className={styles.timeRow}>
                      <Button onClick={() => handleTimeClick(time)}>{time}</Button>
                    </div>
                  ))
                ) : (
                  <p>No available times for this date.</p>
                )}
              </div>
              <div className={styles.modalActions}>
                <Button onClick={handleCloseModal} className={styles.whiteText}>Close</Button>
                {isAdmin && (
                  <Button 
                    onClick={handleShowAvailableTimes} 
                    className={styles.whiteText}
                  >
                    Add Times
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isAdmin && !showTimes && selectedDate && (
        <div className={styles.adminPanel}>
          <h3>Add Available Times</h3>
          <input
            type="text"
            value={newTimes}
            onChange={(e) => setNewTimes(e.target.value)}
            placeholder="Enter times (comma separated)"
          />
          <Button onClick={handleAddTimes} className={styles.whiteText}>Add Times</Button>
        </div>
      )}

      {selectedTime && (
        <p className={styles.selectedDateTime}>
          Selected time: {format(selectedDate, "MMMM dd, yyyy", { locale: lt }).replace(/^\w/, (c) => c.toUpperCase())} at{" "}
          {selectedTime}
        </p>
      )}
    </div>
  );
}

export default BookingCalendar;
