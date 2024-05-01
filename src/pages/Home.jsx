import { Show, createResource, createSignal } from "solid-js";
import Card from "../components/cards/Card";
import { A } from "@solidjs/router";

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:8000/products");

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("🚀 ~ file: Home.jsx:11 ~ fetchProducts ~ error:", error);
  }
};

const Home = () => {
  const [products] = createResource(fetchProducts);
  const [isExpanded, setIsExpanded] = createSignal(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded());
  };

  return (
    <Show when={products()} fallback={<div>Loading...</div>}>
      <div class="grid grid-cols-4 gap-10 my-4">
        {products().map((product) => (
          <Card flat={false} rounded={true}>
            <img src={product.img} alt="product-img" />
            <div class="flex flex-row justify-center">
              <p>Price: </p>
              <p class="text-black-500 font-bold px-2">{`$` + product.price}</p>
            </div>
            <h2>{product.name}</h2>
            <div>
              {isExpanded() ? (
                <p>
                  {product.description}
                  <span
                    onClick={() => toggleDescription()}
                    class="text-red-500 cursor-pointer"
                  >
                    Show less
                  </span>
                </p>
              ) : (
                <p>
                  {product.description.length > 50
                    ? `${product.description.substring(0, 50)}...`
                    : product.description}

                  <span
                    onClick={() => toggleDescription()}
                    class="text-blue-500 cursor-pointer"
                  >
                    Show more
                  </span>
                </p>
              )}
            </div>
            <div class="flex justify-between flex-col">
              <A href={`/product/${product.id}`} class="btn">
                View
              </A>
            </div>
          </Card>
        ))}
      </div>
    </Show>
  );
};

export default Home;
