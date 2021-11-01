import t from './src/index.js';
import p from './p.js';

let count = 0;

const replace = () => {
    p(document.getElementById('app'), counter());
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

const arr = [0, 1, 2];

const counter = () => {
    return t`
        <div id="app">
            <h1>Counter</h1>
            <button onclick="${increment}">+</button>
            <input oninput="${add}" name="input" type="number" value="${count}" />
            ${t`<button onclick="${decrement}">-</button>`}
            <ul>
                ${arr.map((n) => t`<li>${n}</li>`)}
            </ul>
        </div>
    `;
};

replace();
