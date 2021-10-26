import t from './src/index.js';

let count = 0;

const replace = () => {
    const app = document.getElementById('app');
    app.parentNode.replaceChild(counter(), app);
}

const increment = () => {
    count = count + 1;
    replace();
}
const decrement = () => {
    count = count - 1;
    replace();
}
const add = (ev) => {
    count = Number(ev.target.value);
    replace();
}

const counter = () => {
    return t`
        <div id="app">
            <h1>Counter</h1>
            <button onclick="${increment}">+</button>
            <input oninput="${add}" name="input" type="number" value="${count}" />
            ${t`<button onclick="${decrement}">-</button>`}
        </div>
    `;
};

setTimeout(() => replace(), 2000);
