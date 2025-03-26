export default function OrderItem(props) {
  const {
    productData: {
      price,
      name,
      image: { thumbnail },
    },
    qty,
    subtotal,
  } = props;

  return (
    <div className="flex items-center m-2 mb-4 pb-4 border-b-1 border-custom-rose-300 gap-1 md:gap-3 xl:gap-6">
      <img
        className="rounded h-20 w-20 object-scale-down"
        src={thumbnail}
        alt={`thumnbail of ${name}`}
      />
      <div className="mx-2">
        <h3 className="font-semibold text-custom-rose-900 line-clamp-1">
          {name}
        </h3>
        <span className="font-semibold text-custom-red pr-2">{qty}x </span>
        <span className="font-normal text-custom-rose-400">
          @ ${price.toFixed(2)}
        </span>
      </div>
      <div className="grow-1 font-semibold text-custom-rose-900 text-end ">
        ${subtotal.toFixed(2)}
      </div>
    </div>
  );
}
