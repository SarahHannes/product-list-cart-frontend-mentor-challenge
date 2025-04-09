import removeItemIcon from "/icon-remove-item.svg";

export default function CartItem(props) {
  console.log("props in cart item", props);
  const {
    productData: { id, name, price },
    qty,
    subtotalPrice,
    updateOrder,
  } = props;

  function removeItem() {
    console.log("button remove item is clicked!");

    updateOrder((prevOrder) => {
      return { ...prevOrder, [id]: 0 };
    });
  }

  return (
    <div className="my-3 border-b-1 border-custom-rose-100 flex justify-between items-center">
      <div className="mb-3">
        <h6 className="font-semibold">{name}</h6>
        <div className="flex gap-5">
          <span className="font-semibold text-custom-red">{qty}x</span>
          <span className="font-medium text-custom-rose-400">
            @ {price.toFixed(2)}
          </span>
          <span className="font-semibold text-custom-rose-500">
            ${subtotalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={removeItem}
        className="group
        hover:cursor-pointer
        hover:border-custom-rose-900
        border-1 border-custom-rose-400 p-2 rounded-full
        ">
        <img
          className="group-hover:filter-(--black-filter)
          hover:filter-(--black-filter)"
          src={removeItemIcon}
          alt={`Remove ${name} from cart`}
        />
      </button>
    </div>
  );
}
