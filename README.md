# Remix + Deno + Rust<->Webassembly - The Air Metal Stack

Welcome to the Air Metal Stack for Remix! 🦕 + 🦀
This stack is a good choice if you want to run on Deno, deploy to Deno Deploy, and use Rust compiled to WASM for certain functions.

This is a monorepo, with a package for Rust compiled to WASM called `rust_functions`, and a package for your Remix app called `remix-app`. Both of these get built using Turborepo.

For more, check out the [Remix docs](https://remix.run/docs).

## Install

```sh
npx create-remix@latest --template benwis/air-metal-stack
```

## Managing dependencies

Read about [how we recommend to manage dependencies for Remix projects using Deno](https://github.com/remix-run/remix/blob/main/decisions/0001-use-npm-to-manage-npm-dependencies-for-deno-projects.md).

- ✅ You should use `npm` to install NPM packages
  ```sh
  npm install react
  ```
  ```ts
  import { useState } from "react";
  ```
- ✅ You may use inlined URL imports or [deps.ts](https://deno.land/manual/examples/manage_dependencies#managing-dependencies) for Deno modules.
  ```ts
  import { copy } from "https://deno.land/std@0.138.0/streams/conversion.ts";
  ```
- ❌ Do not use [import maps](https://deno.land/manual/linking_to_external_code/import_maps).

## Setting Up Rust

1. Install the Rust language and it's associated tools. You only need to run this once, as it installs globally. If you already have Rust installed, you can skip this step.
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Install wasm-pack to wrap your compiled WASM code in a TS wrapper. The command for Mac and Linux is below. If you're on Windows, visit [this link](https://rustwasm.github.io/wasm-pack/installer/#) for an exe. You only need to run this once, as it installs globally. If you already have wasm-pack installed, you can skip this step.
```sh
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```
## Development

From your terminal:

```sh
npm run build
npm run dev
```

This starts your app in development mode, rebuilding Node assets on file changes. Rust assets currently require you to rerun `npm run build` to recompile them.

### Type hints

This template provides type hinting to VS Code via a [dedicated import map](./.vscode/resolve_npm_imports.json).

To get types in another editor, use an extension for Deno that supports import maps and point your editor to `./.vscode/resolve_npm_imports.json`.

For more, see [our decision doc for interop between Deno and NPM](https://github.com/remix-run/remix/blob/main/decisions/0001-use-npm-to-manage-npm-dependencies-for-deno-projects.md#vs-code-type-hints).

## Production

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

## Deployment

Building the Deno app (`npm run build`) results in two outputs:

- `build/` (server bundle)
- `public/build/` (browser bundle)

You can deploy these bundles to any host that runs Deno, but here we'll focus on deploying to [Deno Deploy](https://deno.com/deploy).

## Setting up Deno Deploy

1. [Sign up](https://dash.deno.com/signin) for Deno Deploy.

2. [Create a new Deno Deploy project](https://dash.deno.com/new) for this app.

3. We use a Github Action to deploy our project's build artifacts to Deno Deploy. To enable this functionality, you must go to your project's settings in Deno and link your Github repo in manual mode.

4. Add a DENO_ENV environment variable to your Deno Deploy project with a value of `production`. This allows us to know when we're running in production and correctly resolve the path to the WASM files.


### Deploying to Deno Deploy

After you've set up Deno Deploy, simply push to your Github repo. It should push your changes over to Deno Deploy. Check the Action in your Github Account, or the Deno Deploy project page for confirmation

