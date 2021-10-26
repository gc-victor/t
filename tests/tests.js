import { expect, test as tst, window } from 't-t';
import jsdom from 'jsdom';
import t from '../src/index';

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body><div id="app"><p>Hello world!</p></div></body>`, {
    url: 'https://t.t/',
});
window('window', dom.window);
window('document', dom.window.document);

const test = process.env.TEST ? tst : () => {};
const ssr = !process.env.TEST ? tst : () => {};
// const only = t;
// const test = () => {};

const useApp = () => {
    const app = document.getElementById('app');

    app.innerHTML = '';

    return app;
};

const replace = (templ) => {
    const app = useApp();
    app.parentNode.replaceChild(templ, app);
};

test('should add to the __handler__ the event hadlers', () => {
    replace(t`
        <div id="app">
            <input
                id="test"
                oninput="${() => {
                    const e = 'input';
                }}"
                onchange="${() => {
                    const e = 'change';
                }}"
            />
        </div>
    `);
    const handler = document.getElementById('test').__handler__;

    expect(handler.change.toString().replace(/\s{2}/g, '')).toBe("() => { const e = 'change'; }");
    expect(handler.input.toString().replace(/\s{2}/g, '')).toBe("() => { const e = 'input'; }");
});

test('should add to the __key__ the key attribute', () => {
    replace(t`
        <div id="app">
            <p id="test" key="test-key"></p>
        </div>
    `);

    expect(document.getElementById('test').__key__).toBe('test-key');
});

test('should remove event and key attributes', () => {
    replace(t`
        <div id="app">
            <input
                id="test"
                key="test-key"
                oninput="${() => {
                    const e = 'input';
                }}"
                onchange="${() => {
                    const e = 'change';
                }}"
            />
        </div>
    `);
    const el = document.getElementById('test');

    expect(el.getAttribute('key')).toBe(null);
    expect(el.getAttribute('oninput')).toBe(null);
    expect(el.getAttribute('onchange')).toBe(null);
});

ssr('should print a minimize string with event and key attributes', () => {
    expect(
        t`
            <div id="app">
                <input
                    id="test"
                    name="test-name"
                    value="test-value"
                    key="test-key"
                    oninput="${() => {}}"
                    onchange="${() => {}}"
                />
            </div>
        `
    ).toBe(
        '<div id="app"><input id="test" name="test-name" value="test-value" /></div>'
    );
});
