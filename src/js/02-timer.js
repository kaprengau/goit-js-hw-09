import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');

const dayElAll = document.querySelectorAll('.timer .value');

btnEl.disabled = true;

let valueInputEl;
let dateArr;
console.log('Dobrogo ranku');
let enteredTime;

flatpickr(inputEl, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  altInput: true,
  onValueUpdate: function (selectedDates, dateStr, instance) {
    valueInputEl = inputEl.value;
  },
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    if (new Date() > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');
      btnEl.classList.add('disable');
      btnEl.disabled = true;
    } else {
      btnEl.disabled = false;
      Notify.success('Press the Start button to invoke timer!');
      console.log('miliseconds', selectedDates[0].getTime());
      console.log('dateStr:', dateStr);
      enteredTime = selectedDates[0];
      console.log('enteredTime', enteredTime);
      dateArr = convertMs(selectedDates[0] - Date.now());
      console.log('convertMs(selectedDates[0] після конвертації', dateArr);
    }
  },
});

btnEl.addEventListener('click', handlerClickStart);

function handlerClickStart() {
  const int = setInterval(runTimer, 1000);
  function runTimer() {
    dateArr = enteredTime - Date.now();
    const timeLeft = convertMs(dateArr);
    if (dateArr <= 0) {
      clearInterval(int);
      return;
    }

    for (const key of Object.keys(timeLeft)) {
      dayElAll.forEach(el => {
        if (Object.keys(el.dataset)[0] === key) {
          el.textContent = addLeadingZero(timeLeft[key]);
        }
      });
    }
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

console.log(addLeadingZero(6));

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
