import cartIcon from "./assets/images/icon-add-to-cart.svg";
import minusIcon from "./assets/images/icon-decrement-quantity.svg";
import plusIcon from "./assets/images/icon-increment-quantity.svg";

export default function Product(props) {
  console.log("props in product", props);
  const { id, category, image, name, price, prodOrderQty, updateOrder } = props;

  function addQty() {
    let newQty = prodOrderQty + 1;

    updateOrder((prevAllOrder) => {
      return {
        ...prevAllOrder,

        // update current product's qty (the key is id)
        [id]: newQty,
      };
    });
  }

  function subtractQty() {
    let newQty = prodOrderQty - 1;

    updateOrder((prevAllOrder) => {
      return {
        ...prevAllOrder,

        // update current product's qty (the key is id)
        [id]: newQty,
      };
    });
  }

  function showAddToCart(qty) {
    if (qty > 0) {
      return (
        <div className="mb-2 bg-custom-red font-medium rounded-full px-8 md:px-3 py-2 inline-flex gap-10 md:gap-2 border-1 border-custom-red items-center">
          <button
            className="
            hover:cursor-pointer
            hover:bg-white
            rounded-full border-1 border-custom-rose-50 p-1 py-2 md:mr-6"
            onClick={subtractQty}>
            <img
              className="
              hover:cursor-pointer
              hover:filter-(--red-filer)
              "
              src={minusIcon}
              alt={`Decrease ${name} by 1`}
            />
          </button>
          <h1 className="mx-1 text-rose-50">{qty}</h1>
          <button
            className="
            hover:cursor-pointer
            hover:bg-white
            rounded-full border-1 border-custom-rose-50 p-1 md:ml-6"
            onClick={addQty}>
            <img
              className="hover:filter-(--red-filer)"
              src={plusIcon}
              alt={`Increase ${name} by 1`}
            />
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="
          hover:cursor-pointer
          hover:text-custom-red

          mb-2 font-medium rounded-full border-1 border-custom-red bg-custom-rose-50 gap-2 py-2 px-4 inline-flex items-center"
          onClick={addQty}
          aria-label={`Add ${name} to cart`}>
          <img src={cartIcon} alt="Add item to cart" />
          Add to cart
        </button>
      );
    }
  }

  const activeBorder =
    prodOrderQty > 0 ? "rounded outline-3 outline-custom-red" : "rounded";

  return (
    <section className="">
      <div className="flex-col">
        <picture>
          {/* desktop: >= 770px */}
          <source
            media="(min-width: 770px)"
            srcSet={image.desktop}
            alt={`Desktop: ${name}`}
          />

          {/* tablet: 576px - 769px */}
          <source
            media="(min-width:576px) and (max-width: 769px)"
            srcSet={image.tablet}
            alt={`Tablet: ${name}`}
          />

          {/* mobile: < 576px */}
          <img
            className={activeBorder}
            src={image.mobile}
            alt={`Mobile: ${name}`}
          />
        </picture>

        <div className="justify-self-center -translate-y-1/2">
          {showAddToCart(prodOrderQty)}
        </div>
      </div>

      <div className="mt-2">
        {/* mt-2 md:mt-10 */}
        <p className="text-custom-rose-500">{category}</p>
        <h3 className="text-custom-rose-900 font-semibold">{name}</h3>
        <div className="text-custom-red font-medium">${price.toFixed(2)}</div>
      </div>
    </section>
  );
}
