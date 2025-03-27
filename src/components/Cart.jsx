import { useState } from "react";

import emptyCartIcon from "/illustration-empty-cart.svg";
import treeIcon from "/icon-carbon-neutral.svg";

import CartItem from "/src/components/CartItem.jsx";
import Modal from "/src/components/Modal.jsx";

export default function Cart(props) {
  console.log("this is props from cart", props);

  const { bodyDOM, orders, products, updateOrder, resetAllOrders } = props;
  const [showModal, setShowModal] = useState(false);

  const cartItems = [];

  function getTotalCount() {
    let countOrder = 0;
    for (const key in orders) {
      countOrder = countOrder + orders[key];
    }
    return countOrder;
  }

  function createCartSummary() {
    let total = 0;
    for (const key in orders) {
      if (orders[key] > 0) {
        const subtotal = createCartItem(key);
        total = total + subtotal;
      }
    }
    return total;
  }

  function createCartItem(key) {
    let subtotal = Number(products[key].price) * Number(orders[key]);
    const newCartItem = (
      <CartItem
        key={key}
        qty={orders[key]}
        productData={{ ...products[key] }}
        subtotalPrice={subtotal}
        updateOrder={updateOrder}
      />
    );

    cartItems.push(newCartItem);
    return subtotal;
  }

  function toggleModal() {
    setShowModal(!showModal);

    // make body non-scrollable when modal is open; and scrollable when it is not
    bodyDOM.classList.toggle("no-doc-scroll");
    console.log("body classlist", bodyDOM.classList);
  }

  function startNewOrder() {
    resetAllOrders();
    setShowModal(false);
  }

  function cartSummary() {
    if (getTotalCount() == 0) {
      return (
        <div className="">
          <h2 className="text-custom-red font-bold text-xl md:text-lg lg:text-2xl">
            Your Cart (0)
          </h2>
          <img className="m-auto" src={emptyCartIcon} alt="Cart is empty" />
          <p className="text-custom-rose-400 text-center font-semibold">
            Your added items will appear here
          </p>
        </div>
      );
    } else {
      const orderTotal = createCartSummary();

      return (
        <>
          <h1 className="text-custom-red font-bold text-xl lg:text-2xl">
            Your Cart ({getTotalCount()})
          </h1>
          {cartItems}
          <div className="py-2 my-2 flex items-center">
            <p className="basis-50 text-custom-rose-900">Order Total</p>
            <div className="text-right basis-full justify-self-end text-xl font-bold">
              ${orderTotal.toFixed(2)}
            </div>
          </div>

          <div className="rounded bg-custom-rose-100 p-2 my-4 flex gap-2 justify-center">
            <img src={treeIcon} alt="Green tree icon" />
            <p className="text-custom-rose-900">
              This is a<span className="font-semibold"> carbon-neutral</span>{" "}
              delivery
            </p>
          </div>

          <button
            className="
            hover:saturate-50
            hover:cursor-pointer
            bg-custom-red text-custom-rose-50 rounded-full p-3 w-full
            "
            onClick={toggleModal}>
            Confirm Order
          </button>

          {showModal && (
            <Modal
              orders={orders}
              products={products}
              startNewOrder={startNewOrder}
              toggleModal={toggleModal}
            />
          )}
        </>
      );
    }
  }
  return <>{cartSummary()}</>;
}
