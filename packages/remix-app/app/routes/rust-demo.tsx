import type { ActionFunction } from "@remix-run/deno";
import { json } from "@remix-run/deno";
import { Form, useActionData, Link } from "@remix-run/react";

import { greet, add } from "../../../rust_functions/build/browser/rust_functions.js";
import * as React from "react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { left_operand, operator, right_operand } =
    Object.fromEntries(formData);
  console.log(Object.fromEntries(formData));
  let result = 0;
  switch (operator) {
    case "+":
        result = add(Number(left_operand), Number(right_operand));
      console.log("result", result);
      return json({
        result,
      });
    default:
      // Implement other operators
      return json({
        result: "🤷🏾",
      });
  }
};

export default function RustDemo() {
  const data = useActionData();
  // Calls the greet function once on page load. This code can only be run on the browser since it calls alert()
  React.useEffect(() => {
    greet();
  }, []);

  return (
    <Form
      className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black"
      method="post"
      replace
    >
      <div className="flex flex-col items-center justify-center rounded-md bg-neutral-900 p-5 text-black">
        <h2
          className="m-2 m-auto h-12 w-full cursor-default rounded-md py-2 px-8 text-center font-sans text-2xl
font-black uppercase tracking-wide  text-white"
        >
          Rust Calculator
        </h2>
        <div className="mt-2 mb-4 flex w-full justify-between">
          <input
            className="m-auto h-12 w-12 cursor-text rounded-md bg-white p-2 text-center font-sans text-2xl text-black"
            type="number"
            name="left_operand"
            id="left_operand"
            placeholder="2"
          />
          <select
            className="m-auto h-12 w-12 cursor-default appearance-none whitespace-pre rounded-md bg-white p-2 text-center
font-sans text-2xl text-black"
            name="operator"
            id="operator"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <input
            className="m-auto h-12 w-12 cursor-text rounded-md bg-white p-2 text-center font-sans text-2xl text-black"
            type="number"
            name="right_operand"
            id="right_operand"
            placeholder="2"
          />
        </div>

        <button
          className="m-2 m h-12 w-full cursor-default rounded-md bg-red-500 py-2 px-8 text-center font-sans
text-2xl font-black uppercase tracking-wide text-white"
          name="wasm"
          value="wasm"
          type="submit"
        >
          =
        </button>
        <div
          className="m-2 flex h-12 w-full items-center justify-center rounded-md bg-white text-2xl text-black
"
        >
          {data?.result ? data?.result : ""}
        </div>
        <Link
          to="/"
          className="m-2 h-12 w-full cursor-default rounded-md bg-red-500 py-2 px-8 text-center font-sans
text-2xl font-black uppercase tracking-wide text-white"
        >
          Back
        </Link>
      </div>
    </Form>
  );
}
