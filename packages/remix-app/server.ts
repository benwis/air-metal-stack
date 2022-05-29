import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { createRequestHandlerWithStaticFiles } from "@remix-run/deno";
// Import path interpreted by the Remix compiler
import * as build from "@remix-run/dev/server-build";

// Import the WASM init function from your Rust JS wrapper
import init from "../rust_functions/build/browser/rust_functions.js";


const go = async () => {

  // You'll need to read the WASM file from the build directory
  await init(Deno.readFile('../rust_functions/build/browser/rust_functions_bg.wasm'));

  const remixHandler = createRequestHandlerWithStaticFiles({
    build,
    mode: Deno.env.get("NODE_ENV"),
    getLoadContext: () => ({}),
  });

  const port = Number(Deno.env.get("PORT")) || 8000;
  console.log(`Listening on http://localhost:${port}`);
  serve(remixHandler, { port });
}
go();
