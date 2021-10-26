# T

T is a micro-library (<800 B) to create DOM Trees using tagged templates.

## Key Features

- Micro-library <800 B
- Zero Dependencies
- No compilation needed
- Real DOM Tree
- SSR out of the box
- Small API, not much to learn

## Let's Play

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script type="module">
            import t from 'https://cdn.jsdelivr.net/gh/gc-victor/t/dist/esm/index.js';
            // Use any patch engine of your choice that patches DOM trees
            import p from 'https://cdn.jsdelivr.net/gh/gc-victor/p/dist/esm/index.js';

            let count = 0;
            const increment = () => {
                count = count + 1;
                // Updates the DOM
                p(document.getElementById('app'), counter());
            };
            const decrement = () => {
                count = count - 1;
                // Updates the DOM
                p(document.getElementById('app'), counter());
            };
            const add = (ev) => {
                count = Number(ev.target.value);
                // Updates the DOM
                p(document.getElementById('app'), counter());
            };

            const component = () => {
                return t`
                    <div id="app">
                        <h1>Counter</h1>
                        <button onclick="${increment}">+</button>
                        <input oninput="${add}" name="input" type="number" value="${count}" />
                        <button onclick="${decrement}">-</button>
                    </div>
                `;
            };
            
            p(document.getElementById('app'), component());
        </script>
    </head>
    <body>
        <div id="app">
            <h1>Counter</h1>
            <button>+</button><input name="input" type="number" value="0"><button>-</button>
        </div>
    </body>
</html>
```

## Install

You can use pnpm, npm or yarn to install it.

```console
npm install git+https://github.com/gc-victor/t.git#main
```

Import it in your framework.

```js
import t from 't';
```

Or import it in a `<script>` as a module.

```html
<script type="module">
    import t from 'https://cdn.jsdelivr.net/gh/gc-victor/t/dist/esm/index.js';
</script>
```

## How to use it

A key or name attribute is required to keep the focus of an active element when its content change.

```javascript
t`<input name="input" />`
```

An attribute with placeholders has to be between quotes.

```javascript
t`<button onclick="${increment}">${text}</button>`
```

The events use the native naming convention and the handler as the rest of the attributes between quotes.

```javascript
t`<input oninput="${add}" name="input" type="number" value="${count}" />`
```

Multiple templates can be inherited

```javascript
t`<p>${t`<span>t</span>`}</p>`;
```

## Acknowledgments

### Inspiration

-   [facon](https://github.com/terkelg/facon)
-   [uhtml](https://github.com/WebReflection/uhtml)
-   [htm](https://github.com/developit/htm)

### Tools

-   [esbuild](https://esbuild.github.io/)
-   [gzip-size](https://esbuild.github.io/)
-   [d-d](https://github.com/gc-victor/d-d)
-   [esm](https://github.com/standard-things/esm)
-   [es-module-shims](https://github.com/guybedford/es-module-shims)
-   [jsdom](https://github.com/jsdom/jsdom)
-   [t-t](https://github.com/gc-victor/t-t)
-   [chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)

## Compatible Versioning

### Summary

Given a version number MAJOR.MINOR, increment the:

- MAJOR version when you make backwards-incompatible updates of any kind
- MINOR version when you make 100% backwards-compatible updates

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR format.

[![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

### Reporting Issues

Found a problem? Want a new feature? First of all, see if your issue or idea has [already been reported](../../issues).
If it hasn't, just open a [new clear and descriptive issue](../../issues/new).

### Commit message conventions

A specification for adding human and machine readable meaning to commit messages.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope and do avoid unrelated commits.

-   Fork it!
-   Clone your fork: `git clone http://github.com/<your-username>/t`
-   Navigate to the newly cloned directory: `cd t`
-   Create a new branch for the new feature: `git checkout -b my-new-feature`
-   Install the tools necessary for development: `npm install`
-   Make your changes.
-   `npm run build` to verify your change doesn't increase output size.
-   `npm test` to make sure your change doesn't break anything.
-   Commit your changes: `git commit -am 'Add some feature'`
-   Push to the branch: `git push origin my-new-feature`
-   Submit a pull request with full remarks documenting your changes.

## License

[MIT License](https://github.com/gc-victor/t/blob/master/LICENSE)

Copyright (c) 2021 Víctor García

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
