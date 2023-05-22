// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const btn = document.getElementById('btn');

const memo = (cb) => {
  const cache = {};

  return (...args) => {
    const JsonizedValue = JSON.stringify(args);
    if (!cache[JsonizedValue]) {
      console.log('not cached', cache);
      cache[JsonizedValue] = cb.apply(this, args);
    }

    return cache[JsonizedValue];
  };
};

const debounce = (cb, timer = 300) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb.apply(this, args);
    }, timer);
  };
};

const throttle = (cb, timer = 300) => {
  let isThrottled = false;

  return (...args) => {
    if (!isThrottled) {
      isThrottled = true;
      cb.apply(this, args);

      setTimeout(() => {
        isThrottled = false;
      }, timer);
    }
  };
};

let a = debounce((e, f) => console.log(e, f), 200);
let b = throttle((e, f) => console.log(e, f), 1000);
let c = memo((e, f, g) => e + f + g);

btn.addEventListener('click', (event) => {
  console.log(c(2, 3, 4));
});
