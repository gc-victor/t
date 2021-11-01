const isNodejs = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]';
const events = {};

function t(strings, ...args) {
    let result = '';
    let i = 0;
    const length = args.length;

    while (i < length) {
        const s = strings[i];
        const a = args[i];
        if (isNodejs) {
            result += s + (Array.isArray(a) ? a.join('') : a);
        } else {
            const isEvent = /on\w+="$/.test(s);
            const isFunction = typeof a === 'function';
            const nose = isEvent
                ? s.replace(
                      /on(\w+)="$/,
                      `data-_on_="" data-_fn_${i}='${a}' data-_ev_${i}="$1" data-_arg_${i}="`
                  )
                : s;
            const tail = isFunction
                ? isEvent
                    ? `${i}`
                    : a()
                : a instanceof Element || Array.isArray(a)
                    ? `<script data-_replace_='${i}'></script>`
                    : a;
            result += nose + tail;
        }
        i++;
    }

    result += strings[strings.length - 1];

    if (isNodejs) {
        return result
            .replace(/\son\w+=".*?"/g, '')
            .replace(/\skey=".*?"/g, '')
            .replace(/>[\r\n ]+</g, '><')
            .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : ' '))
            .trim();
    }

    const template = document.createElement(`template`);
    template.innerHTML = result;
    const content = template.content;

    let l = 0;
    const elsToReplace = [...content.querySelectorAll('[data-_replace_]')];
    const elsToReplaceLength = elsToReplace.length;
    while (l < elsToReplaceLength) {
        const el = elsToReplace[l];
        const replace = args[el.getAttribute('data-_replace_')];
        if (Array.isArray(replace)) {
            let ll = 0;
            const elsToReplaceLengthLl = replace.length;
            while (ll < elsToReplaceLengthLl) {
                const ell =
                    replace[ll] instanceof HTMLElement
                        ? replace[ll]
                        : document.createTextNode(replace[ll]);
                el.parentNode.insertBefore(ell, el);
                ll++;
            }
            el.parentNode.removeChild(el);
        } else {
            el.parentNode.replaceChild(replace, el);
        }
        l++;
    }

    let j = 0;
    const els = [...content.querySelectorAll('[data-_on_]')];
    const elsLength = els.length;
    while (j < elsLength) {
        const el = els[j];
        Object.keys(els[j].dataset).forEach((data) => {
            if (/^_ev_/.test(data)) {
                const index = data.replace('_ev_', '');
                const type = el.getAttribute(`data-_ev_${index}`);
                el.__key__ = el.getAttribute('key');
                el.__handler__ = el.__handler__ || {};
                el.__handler__[type] = args[el.getAttribute(`data-_arg_${index}`)];
                !events[type] && document.addEventListener(type, handler);
                events[type] = 1;
                el.removeAttribute(`data-_on_`);
                el.removeAttribute(`data-_fn_${index}`);
                el.removeAttribute(`data-_arg_${index}`);
                el.removeAttribute(`data-_ev_${index}`);
            }
        });
        el.removeAttribute('key');
        j++;
    }

    let k = 0;
    const elsWithKey = [...content.querySelectorAll('[key]')];
    const elsWithKeyLength = elsWithKey.length;
    while (k < elsWithKeyLength) {
        const el = elsWithKey[k];
        el.__key__ = el.getAttribute('key');
        el.removeAttribute('key');
        k++;
    }

    return content.children[0];
}

const handler = (ev) => {
    let el = ev.target;
    const type = ev.type;
    while (el !== null) {
        const handler = el.__handler__ && el.__handler__[type];
        if (handler) {
            handler(ev);
            return;
        }
        el = el.parentNode;
    }
};

export default t;
