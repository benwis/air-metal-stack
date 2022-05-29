# Rust <-> Remix Sandbox
## _Now with both native Rust, server side WASM ,and browser side WASM versions!_

If you want to combine the **Web Fundamentals & Modern UX** of Remix together with the **Reliability, Performance & Efficiency** of Rust, you can use functions built with Rust on your server. Useful for intensive computations such as on the fly machine learning tasks, image processing, fibonacci etc.

One of the best ways to do that is to use Node's FFI interface through napi-rs, which generates compiled native node addons from Rust code. This has been shown to be faster than the compiling it to WASM and including it that way. 

This repo contains changes to the Remix compiler to add support for native .node files, which get included in your server bundle. This could probably can't run on the client, so it's to be used in loaders/actions only.

I have this repo setup for both methods, whether you'd like to compile to WASM or use napi-rs to generate a local Node module, this repo should help

## Example

If you don't have Rust installed on your computer the first thing to do is to get this set up

Installing Rust:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
 Installing napi-rs

Then we need to install napi-rs globally with
```sh
yarn global add @napi-rs/cli
# or
npm install -g @napi-rs/cli
# or
pnpm add -g @napi-rs/cli
```
Save the index.js file in the napi-rust-functions folder. If you need a different platform than the one included in the repo, you need to delete the napi-rust-functions target and create a new one. Give it a name of napi-rust-functions and select the target for your CPU. The rest of the options don't matter unless you want to publish your package on npm. 

```sh
napi new
```
Build the JS wrapper and index.js file
```sh
cd napi-rust-functions
npm run build
```

You'll need to remove the platform detection code in index.js. The saved index.js file is a good example which includes only one prebuilt item, but you'll need to remove the platform detection code, and copy the filename for your platform's .node file.

If you make changes to the rust code, you will need to rerun the `npm run build` command and edit the index.js file. I suspect you won't need to edit the index.js file if you generate every platform's code, but I have not explored that yet.

Installing the WASM version:

The WASM version of the function lives in the rust-functions folder. It gets rebuilt everytime you run `npm run dev` via the predev command in package.json.

Here we use `wasm-pack` to comile our Rust code down to WASM

Installing [wasm-pack](https://github.com/rustwasm/wasm-pack):

```sh
cargo install wasm-pack
```

In this example, the Rust library is already built with the associated code. But if you wanted to set up your own library you could do so by running the following command:

```sh
cargo new --lib <library-name>
```

Then build the library using:

```sh
cd <library-name>
wasm-pack build --target nodejs
```

After succesfully bulding the library you can add this to your dependencies by running inside your remix project:

```sh
npm install ./<library-name>/pkg
```

This will add the dependency to your `package.json` file.

```json
    ...
    "@remix-run/serve": "1.1.3",
    "<library-name>": "file:<library-name>/pkg"
    ...
```

## Notes:

_To prevent remix from including the rust-functions library in the client build we can re-export the functions using a `.server.ts` file, e.g. [rust.server.ts](app/rust.server.ts)_

_This project includes patches to @remix-run/dev to support the .node add on. These should be automatically applied during the npm install step, but may become unecessary in the future._

## Related Links

[Rust](https://rust-lang.org/)

[Napi-rs](https://napi.rs/)

[Wasm-pack](https://github.com/rustwasm/wasm-pack)

[Tensorflow & WebAssembly](https://blog.tensorflow.org/2020/03/introducing-webassembly-backend-for-tensorflow-js.html)

