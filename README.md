<!-- markdownlint-disable-next-line -->
<div align="center">

# FaustTobias/svelte-template

Automatically maintained svelte templates.

</div>

## Introduction

This repository contains several svelte templates that are automatically maintained. They are based on the official templates.

## Features

Every template contains the following features:

- Code formatting using [prettier](https://prettier.io/)
- Pre-commit linting using [lint-staged](https://github.com/okonet/lint-staged) with [husky@4](https://typicode.github.io/husky)<sup>\[[?](#why-husky-4)\]</sup>

## Available templates

If you are unsure which one to pick, choose the `snowpack-typescript` one:

```bash
mkdir <project-name>
cd <project-name>
git init
npx degit FaustTobias/svelte-template#snowpack-typescript . --force
yarn
```

| Name                       | Description                                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| snowpack-typescript        | Preconfigured [yarn 2] [snowpack] project with TypeScript integration. Useful for single page applications.                                           |
| snowpack-javascript        | Preconfigured [yarn 2] [snowpack] project without preprocessor integrations. Useful for single page applications.                                     |
| typescript-tailwind        | Preconfigured [yarn 2] project with TypeScript integration and TailwindCSS. Useful for single page applications. Based on [sveltejs/template].        |
| typescript                 | Preconfigured [yarn 2] project with TypeScript integration. Useful for single page applications. Based on [sveltejs/template].                        |
| javascript                 | Preconfigured [yarn 2] project without preprocessor integrations. Useful for single page applications. Based on [sveltejs/template].                  |
| sapper-typescript-tailwind | Preconfigured [yarn 2] [sapper] project with TypeScript integration and TailwindCSS. Useful for websites. Based on [sveltejs/sapper-template#rollup]. |
| sapper-typescript          | Preconfigured [yarn 2] [sapper] project with TypeScript integration. Useful for websites. Based on [sveltejs/sapper-template#rollup].                 |
| sapper-javascript          | Preconfigured [yarn 2] [sapper] project without preprocessor integrations. Useful for websites. Based on [sveltejs/sapper-template#rollup].           |

## FAQ

### Why husky 4?

Husky caused quite some controversies after releasing its 5.0.0 Release. First of all, its licensed changed to be a [copyleft license](https://paritylicense.com/versions/7.0.0.html). This makes it pretty much unusable in closed source projects. Additionally, its configuration has changed and you have to depend on an external module which handles the postinstall step for you. The templates here will stick to version 4 for now.

## Maintainer

[Tobias Faust](https://github.com/FaustTobias)

<!-- links -->

[yarn 2]: https://yarnpkg.com/
[sapper]: https://sapper.svelte.dev/
[sveltejs/template]: https://github.com/sveltejs/template
[sveltejs/sapper-template#rollup]: https://github.com/sveltejs/sapper-template/tree/rollup
[snowpack]: https://www.snowpack.dev/
