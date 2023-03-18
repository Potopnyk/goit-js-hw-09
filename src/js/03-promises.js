import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = parseInt(form.amount.value);
  const delay = parseInt(form.delay.value);
  const step = parseInt(form.step.value);
  
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    createPromise(position, delay + (i * step))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}