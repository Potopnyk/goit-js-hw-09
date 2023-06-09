import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const el = {
    datetime: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
};

flatpickr(el.datetime, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDates]) {

    if (selectedDates < new Date()) {
        el.startButton.disabled = true;
    } else {
        el.startButton.disabled = false;
        el.startButton.addEventListener('click', () => {
        startCountdown(selectedDates);
        });
    }
    },
});

function startCountdown(selectedDates) {

    const countdownInterval = setInterval(() => {
        const currentDate = new Date();
        const differenceInMs = Math.floor(selectedDates - currentDate);
        const formatedDifferenceInMs = convertMs(differenceInMs);

        if (differenceInMs <= 0) {
            clearInterval(countdownInterval);
            resetValues();

        } else {
            populateValues(formatedDifferenceInMs)
        }
    }, 1000);
};


        
function populateValues({seconds = '00', minutes = '00', hours = '00', days = '00'}) {
    el.secondsValue.textContent = seconds.toString().padStart(2, '0');
    el.minutesValue.textContent =  minutes.toString().padStart(2, '0');
    el.hoursValue.textContent =  hours.toString().padStart(2, '0');
    el.daysValue.textContent =  days.toString().padStart(2, '0');
};


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};