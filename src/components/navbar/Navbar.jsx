import { A } from "@solidjs/router";
import { CartContext, useCartContext } from "../../context/CartContext";

const Navbar = () => {
  const { items } = useCartContext(CartContext);
  const quantity = () => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  };
  return (
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
        <span class="px-2">{quantity()}</span>
      </A>
    </nav>
  );
};

export default Navbar;
