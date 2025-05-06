import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const displays = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};
let timerInterval = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (!selectedDate || selectedDate <= new Date()) {
      iziToast.error({ title: "Error", message: "Please choose a date in the future", position: "topRight" });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

const addLeadingZero = (value) => value.toString().padStart(2, "0");

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
};

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  displays.days.textContent = days;
  displays.hours.textContent = addLeadingZero(hours);
  displays.minutes.textContent = addLeadingZero(minutes);
  displays.seconds.textContent = addLeadingZero(seconds);
};

const startTimer = () => {
  startButton.disabled = true;
  datePicker.disabled = true;
  timerInterval = setInterval(() => {
    const diff = userSelectedDate - new Date();
    if (diff < 1000) {
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datePicker.disabled = false;
      startButton.disabled = true;
      return;
    }
    updateTimerDisplay(convertMs(diff));
  }, 1000);
};

startButton.addEventListener("click", startTimer);

