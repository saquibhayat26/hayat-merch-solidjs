import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

function App(props) {
  const [darkTheme, setDarkTheme] = createSignal(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }
  return (
    <div class="container m-auto">
      <nav>
        <A
          href="/"
          class="px-4 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
        >
          Home
        </A>
        <A
          href="/cart"
          class="px-4 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
        >
          cart
        </A>
      </nav>
      <header
        class="my-4 p-2 text-xl flex items-center gap-4 justify-end"
        classList={{ "bg-neutral-900": darkTheme(), "text-white": darkTheme() }}
      >
        <span
          class="material-symbols-outlined cursor-pointer"
          onClick={toggleTheme}
        >
          light_mode
        </span>
        <h1 class="mr-auto">Hayat Merch</h1>
      </header>
      <div class="rounded-md w-[100%] h-[20vh] shadow-md text-center justify-center backdrop-grayscale-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center">
        <h1 class="text-6xl text-white uppercase">Welcome to Hayat Merchant</h1>
      </div>

      {props.children}
    </div>
  );
}

export default App;
