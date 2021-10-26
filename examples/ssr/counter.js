import { buildPage } from './build-page';
import t from '../src';

const tests = 0;
const fn = () => {};

buildPage({
    content: t`
        <div id="app">
            <h1>Counter</h1>
            <button onclick="${fn}">+</button>
            <input oninput="${fn}" name="input" type="number" value="${tests}" />
            <button onclick="${fn}">-</button>
        </div>
    `,
    output: 'examples/counter.html',
})
    .then((fullPath) => console.log('Success: ' + fullPath + '\n'))
    .then(() => process.exit())
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
