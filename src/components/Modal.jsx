import orderConfirmIcon from "./assets/images/icon-order-confirmed.svg";
import OrderItem from "./OrderItem";

export default function Modal({
  orders,
  products,
  startNewOrder,
  toggleModal,
}) {
  console.log("orders from modal", orders);
  console.log("products from modal", products);

  const orderItems = [];
  let orderTotalPrice = 0;
  for (const key in orders) {
    if (orders[key] > 0) {
      const productData = products[key];
      const qty = orders[key];
      const subtotal = Number(qty) * productData.price;
      orderTotalPrice = orderTotalPrice + subtotal;

      const curItem = (
        <OrderItem
          key={key}
          productData={{ ...productData }}
          qty={qty}
          subtotal={subtotal}
        />
      );

      orderItems.push(curItem);
    }
  }

  return (
    <div className="overflow-y-auto w-screen h-screen md:w-lg xl:w-xl top-0 bottom-0 right-0 left-0 md:mx-auto lg:my-auto fixed">
      {/* overlay */}
      <div
        className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-stone-800/50"
        onClick={toggleModal}></div>

      {/* the dialogue */}
      <div className=" size-fit rounded p-6 w-full bg-white absolute top-15 lg:top-1vh">
        <img
          className="my-4"
          src={orderConfirmIcon}
          alt="round green checkmark icon"
        />
        <h2 className="my-2 text-custom-rose-900 text-5xl font-bold">
          Order Confirmed
        </h2>
        <p className="mb-5 text-custom-rose-400">
          We hope you enjoy your food!
        </p>

        <div className="rounded bg-custom-rose-100 p-3">
          {orderItems}
          <div className="m-2 flex items-center font-normal text-custom-rose-900">
            Order Total
            <span className="font-bold text-2xl text-custom-rose-900 grow-1 text-end">
              ${orderTotalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          className="
          hover:cursor-pointer
          hover:saturate-50
          bg-custom-red text-custom-rose-50 w-full rounded-full p-2 mt-8"
          onClick={startNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
}
