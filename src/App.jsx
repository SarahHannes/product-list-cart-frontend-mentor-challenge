import { useState } from "react";
import "./App.css";
import data from "/data.json";

import Product from "/src/components/Product.jsx";
import Cart from "/src/components/Cart.jsx";

function App() {
  const bodyDOM = document.querySelector("body");
  console.log(data.length);
  const prodKeys = [];
  const newCart = {};
  const newData = {};

  function cleanProdKey(name) {
    let cleanKey = name.toLowerCase().replaceAll(" ", "-");
    return cleanKey.replace("è", "e").replace("û", "u").replace("é", "e");
  }

  data.forEach((d) => {
    const key = cleanProdKey(d.name);
    prodKeys.push(key);

    newCart[key] = 0;

    // newData = {productKey: { all product details }}
    newData[key] = { ...d, id: key };
  });

  const [allOrder, setAllOrder] = useState(newCart);
  const prodComponents = [];

  for (const key in newData) {
    console.log("d in new data", key);
    const newComponent = (
      <Product
        key={key}
        {...newData[key]}
        prodOrderQty={allOrder[key]}
        updateOrder={setAllOrder}
      />
    );
    prodComponents.push(newComponent);
  }

  function resetAllOrders() {
    setAllOrder(newCart);
    bodyDOM.classList.remove("no-doc-scroll");
  }

  return (
    <main className="min-h-screen font-redhat bg-custom-rose-100 p-4 lg:p-10 lg:flex">
      <div>
        <h1 className="text-3xl font-bold pb-3">Desserts</h1>
        <div className="grid grid-cols-1 gap-4 md:gap-5 grid-rows-3 md:grid-cols-3">
          {prodComponents}
        </div>
      </div>

      <div className="bg-custom-rose-50 rounded p-4 mt-4 lg:mt-0 lg:ms-4 lg:self-start lg:w-1/2">
        <Cart
          bodyDOM={bodyDOM}
          orders={{ ...allOrder }}
          products={{ ...newData }}
          updateOrder={setAllOrder}
          resetAllOrders={resetAllOrders}
        />
      </div>
    </main>
  );
}

export default App;
