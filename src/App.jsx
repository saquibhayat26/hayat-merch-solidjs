import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { CartContextProvider } from "./context/CartContext";
import Navbar from "./components/navbar/Navbar";

function App(props) {
  const [darkTheme, setDarkTheme] = createSignal(false);

  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }
  return (
    <CartContextProvider>
      <div class="container m-auto">
        <Navbar />
        <header
          class="my-4 p-2 text-xl flex items-center gap-4 justify-end"
          classList={{
            "bg-neutral-900": darkTheme(),
            "text-white": darkTheme(),
          }}
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
          <h1 class="text-6xl text-white uppercase">
            Welcome to Hayat Merchant
          </h1>
        </div>

        {props.children}
      </div>
    </CartContextProvider>
  );
}

export default App;
