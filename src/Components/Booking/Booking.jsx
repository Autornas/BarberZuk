import React, { useState, useEffect, useCallback } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { lt } from "date-fns/locale";
import styles from "./Booking.module.css";
import Button from "../UI/Button.jsx";
import Card from "../UI/Card.jsx";
import CardContent from "../UI/CardContent.jsx";
import { getAvailableTimes, addAvailableTimes } from "../../firebase";
import { auth, checkIfAdmin } from "../../firebase";

// Debounced effect for fetch
const useDebouncedEffect = (callback, delay) => {
  const [debounced] = useState(() => {
    return (...args) => {
      clearTimeout(debounced.timeout);
      debounced.timeout = setTimeout(() => callback(...args), delay);
    };
  });
  return debounced;
};

function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimes, setShowTimes] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [newTimes, setNewTimes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [timesCache, setTimesCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddTimesModal, setShowAddTimesModal] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setIsAdmin(checkIfAdmin());
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Fetch available times
  const fetchAvailableTimes = async (date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    if (timesCache[dateKey]) {
      setAvailableTimes(timesCache[dateKey]);
      setShowTimes(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const times = await getAvailableTimes(date);
      console.log("Fetched times for", date, ":", times); // Log fetched times
      setAvailableTimes(times);
      setTimesCache((prevCache) => ({
        ...prevCache,
        [dateKey]: times,
      }));
      setShowTimes(true); // Show the times modal after fetching
    } catch (error) {
      console.error("Error fetching available times:", error);
      setError("Failed to load available times. Please try again.");
      setAvailableTimes([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useDebouncedEffect(fetchAvailableTimes, 500); // 500ms debounce

  const handleDateClick = useCallback((day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(clickedDate);
    setSelectedTime(null);
    
    console.log("Date clicked:", clickedDate); // Log the clicked date
    debouncedFetch(clickedDate); // Debounced fetch function call
  }, [currentMonth, debouncedFetch]);

  useEffect(() => {
    if (availableTimes.length > 0) {
      console.log("Available times:", availableTimes); // Log available times
    }
  }, [availableTimes]);

  // Ensure `showTimes` is updated correctly
  useEffect(() => {
    console.log("showTimes state:", showTimes); // Log the showTimes state
  }, [showTimes]);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setShowTimes(false);
  };

  const handleCloseModal = () => {
    setShowTimes(false);
    setSelectedDate(null);
  };

  const handleAddTimes = async () => {
    if (newTimes.length === 0) return;

    const date = format(selectedDate, "yyyy-MM-dd");
    await addAvailableTimes(date, newTimes);

    setTimesCache((prevCache) => ({
      ...prevCache,
      [date]: [...(prevCache[date] || []), ...newTimes],
    }));

    setNewTimes([]);
    fetchAvailableTimes(date);
    setShowAddTimesModal(false);  // Close Add Times modal after adding times
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 10; hour <= 19; hour++) {
      times.push(`${hour}:00`);
      if (hour !== 19) times.push(`${hour}:30`);
    }
    return times;
  };

  const handleTimeSelection = (time) => {
    if (!newTimes.includes(time)) {
      setNewTimes([...newTimes, time]);
    } else {
      setNewTimes(newTimes.filter((t) => t !== time));
    }
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 6 % 7;

  return (
    <div className={styles.calendarContainer}>
      <Card>
        <CardContent>
          <div className={styles.calendarHeader}>
            <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</Button>
            <h2>{format(currentMonth, "MMMM yyyy", { locale: lt }).replace(/^\w/, (c) => c.toUpperCase())}</h2>
            <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</Button>
          </div>

          <div className={styles.dayLabels}>
            {["Pir", "Ant", "Tre", "Ket", "Pen", "Ses", "Sek"].map((day) => (
              <div key={day} className={styles.dayLabel}>{day}</div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className={styles.emptyCell}></div>
            ))}

            {[...Array(daysInMonth)].map((_, index) => (
              <Button
                key={index}
                className={selectedDate && selectedDate.getDate() === index + 1 && selectedDate.getMonth() === currentMonth.getMonth() ? styles.selectedDate : ""}
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
              <h3 className={styles.timeTitle}>
                Available times for {format(selectedDate, "MMMM dd", { locale: lt }).replace(/^\w/, (c) => c.toUpperCase())}:
              </h3>
              <div className={styles.timeGrid}>
                {loading ? (
                  <p>Loading available times...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : availableTimes.length > 0 ? (
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
                  <Button onClick={() => setShowAddTimesModal(true)} className={styles.whiteText}>Add Times</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAddTimesModal && (
        <div className={styles.addTimesModal}>
          <Card>
            <CardContent>
              <h3>Add Available Times</h3>
              <div className={styles.timeSelection}>
                {generateTimeOptions().map((time) => (
                  <Button key={time} onClick={() => handleTimeSelection(time)}>
                    {time}
                  </Button>
                ))}
              </div>
              <div className={styles.modalActions}>
                <Button onClick={handleAddTimes} className={styles.whiteText}>Save Times</Button>
                <Button onClick={() => setShowAddTimesModal(false)} className={styles.whiteText}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default BookingCalendar;
