# Parcel MDX transformer

Unofficial [MDX][1] 3 [transformer plugin][2] for [Parcel][3] 2

[![NPM Dependency](https://img.shields.io/librariesio/github/EasyWebApp/Parcel-transformer-MDX.svg)][4]
[![CI & CD](https://github.com/EasyWebApp/Parcel-transformer-MDX/actions/workflows/main.yml/badge.svg)][5]

## Supported features

1. [GitHub flavored Markdown (GFM)](https://github.com/remarkjs/remark-gfm)
2. [Frontmatter](https://github.com/remarkjs/remark-frontmatter)
3. [Syntax highlighting](https://github.com/mapbox/rehype-prism)
4. [Embed](https://github.com/remark-embedder/core)

## React usage

### Installation

```shell
npm init -y
npm i react react-dom
npm i parcel @parcel/config-default parcel-transformer-mdx -D
```

### `package.json`

```json
{
    "scripts": {
        "start": "parcel ./src/index.html",
        "build": "parcel build ./src/index.html --public-url ."
    }
}
```

### `.parcelrc`

```json
{
    "extends": "@parcel/config-default",
    "transformers": {
        "*.{md,mdx}": ["parcel-transformer-mdx"]
    }
}
```

### `index.html`

```html
<!doctype html>
<html>
    <head>
        <link
            rel="stylesheet"
            href="https://unpkg.com/prismjs@1.29.0/themes/prism-okaidia.css"
        />
    </head>
    <body>
        <div id="root"></div>

        <script type="module" src="index.jsx"></script>
    </body>
</html>
```

### `index.jsx`

```jsx
import { createRoot } from 'react-dom/client';

import Index from './index.mdx';

const root = createRoot(document.querySelector('#root'));

root.render(<Index />);
```

### `index.mdx`

```markdown
---
title: Hello MDX
---

# Hello MDX

https://react.dev/

https://www.youtube.com/watch?v=VEoMT8pAxMA
```

## JSX compatible engines usage

-   WebCell example: https://github.com/EasyWebApp/BootCell-document

## Inspiration

https://github.com/parcel-bundler/parcel/pull/7922

[1]: https://mdxjs.com/
[2]: https://parceljs.org/plugin-system/transformer/
[3]: https://parceljs.org/
[4]: https://libraries.io/npm/parcel-transformer-mdx
[5]: https://github.com/EasyWebApp/Parcel-transformer-MDX/actions/workflows/main.yml
