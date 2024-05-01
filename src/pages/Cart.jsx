import { For } from "solid-js";
import Card from "../components/cards/Card";
import { useCartContext } from "../context/CartContext";

export default function Cart() {
  const { items } = useCartContext();

  console.log("🚀 ~ file: Cart.jsx:8 ~ Cart ~ cartsData:", items);

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <>
      <div class="max-w-md my-8 mx-auto">
        <h2>Your Shopping Cart</h2>
      </div>
      <For each={items}>
        {(item) => (
          <Card rounded={true}>
            <div class="flex flex-row justify-between items-center px-10">
              <img
                src={item.img}
                alt="product-img"
                class="w-[120px] h-[120px]"
              />
              <h2 class="font-bold">{item.title}</h2>

              <p>
                ${item.price} x {item.quantity}
              </p>
            </div>
          </Card>
        )}
      </For>
      <div class="flex flex-row justify-end my-10 font-bold">
        <h1>Total: ${calculateTotal()}</h1>
      </div>
    </>
  );
}
