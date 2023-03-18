function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
const prompt = 1000;

const el = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyColor: document.querySelector('body')
}

el.startBtn.addEventListener('click', () => {
    el.startBtn.disabled = true;
    timerId = setInterval(() => {
        let color = getRandomHexColor();
        el.bodyColor.style.background = color;
    }, 1000);
});

el.stopBtn.addEventListener('click', () => {
    el.startBtn.disabled = false;
    clearInterval(timerId);
})