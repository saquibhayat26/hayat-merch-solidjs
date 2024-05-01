import { Show, createResource, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { useCartContext } from "../context/CartContext";

const fetchProduct = async (id) => {
  try {
    const response = await fetch("http://localhost:8000/products/" + id);

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("🚀 ~ file: Home.jsx:11 ~ fetchProducts ~ error:", error);
  }
};

export default function Product() {
  const params = useParams();
  const [product] = createResource(params.id, fetchProduct);
  const { items, setItems } = useCartContext();
  const [adding, setAdding] = createSignal(false);
  const [maxQuantityReached, setMaxQuantityReached] = createSignal(false);

  const addProductToCart = () => {
    //check if product exist in cart or not
    const exist = items.find((item) => item.id === product().id);
    if (exist) {
      const quantity =
        items.find((item) => item.id === product().id).quantity + 1;

      if (quantity <= 3) {
        setAdding(true);
        setTimeout(() => {
          setAdding(false);
        }, 2000);
        setMaxQuantityReached(false);
        setItems(
          (item) => item.id === product().id,
          "quantity",
          (q) => q + 1
        );
      } else {
        setMaxQuantityReached(true);
        setTimeout(() => {
          setMaxQuantityReached(false);
        }, 4000);
      }
    } else {
      setItems([...items, { ...product(), quantity: 1 }]);
      setAdding(true);
      setTimeout(() => {
        setAdding(false);
      }, 2000);
    }
  };

  return (
    <div class="my-7">
      <Show when={maxQuantityReached()}>
        <div class="flex flex-row justify-center items-center bg-red-500 text-white p-5 rounded-md">
          <p>
            Sorry, we only have 3 of this product in stock. Please remove an
            item from your cart to add more.
          </p>
        </div>
      </Show>
      <Show when={product()} fallback={<div>Loading...</div>}>
        <div class="grid grid-cols-5 gap-7">
          <div class="col-span-2">
            <img src={product().img} alt="product-img" />
          </div>
          <div class="col-span-3">
            <h2 class="text-3xl font-bold mb-7">{product().title}</h2>
            <p>{product().description}</p>
            <p class="my-7 text-2xl">Only ${product().price}</p>
            <button
              class="col-span-1 btn"
              classList={{
                "bg-green-500 text-white": !adding(),
                "bg-green-300 cursor-not-allowed": adding(),
              }}
              onclick={addProductToCart}
              disabled={adding()}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </Show>
      <Show when={adding()}>
        <div class="flex flex-row justify-center items-center bg-green-500 text-white p-5 rounded-md">
          <p>{product().title} added to cart.</p>
        </div>
      </Show>
    </div>
  );
}
