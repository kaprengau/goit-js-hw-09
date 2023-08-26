import Notiflix from 'notiflix';
function promiseGenerator() {
  const formEl = document.querySelector('.form');

  const onFormElSubmit = event => {
    event.preventDefault();

    const { delay, step, amount } = event.target.elements;

    for (let i = 1; i <= Number(amount.value); i++) {
      createPromise(i, Number(delay.value), Number(step.value))
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }

    function createPromise(position, delay, step) {
      const shouldResolve = Math.random() > 0.3;

      const myPromise = new Promise((res, rej) => {
        setTimeout(() => {
          if (shouldResolve) {
            res({ position, delay });
          } else {
            rej({ position, delay });
          }
        }, delay);
      });
      return myPromise;
    }
  };

  formEl.addEventListener('submit', onFormElSubmit);
}

promiseGenerator();
