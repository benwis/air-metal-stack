import { RemixBrowser } from "@remix-run/react";
import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import init from "../../rust_functions/build/browser/rust_functions"
import wasm from "../../rust_functions/build/browser/rust_functions_bg.wasm"

init(wasm).then(() => {
    hydrateRoot(document, <RemixBrowser />);
})
