import { Show, createResource, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";

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
  return (
    <div class="my-7">
      <Show when={product()} fallback={<div>Loading...</div>}>
        <div class="grid grid-cols-5 gap-7">
          <div class="col-span-2">
            <img src={product().img} alt="product-img" />
          </div>
          <div class="col-span-3">
            <h2 class="text-3xl font-bold mb-7">{product().title}</h2>
            <p>{product().description}</p>
            <p class="my-7 text-2xl">Only ${product().price}</p>
            <A href="/cart" class="col-span-1 btn">
              Add To Cart
            </A>
          </div>
        </div>
      </Show>
    </div>
  );
}
