import React, { useEffect, useState } from "react";
import CartProduct from "../ui/CartProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CheckOut from "../ui/CheckOut";

function Cart({ cart, usersList, setCart, user }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let tempPrice = 0;
    cart.forEach((item) => (tempPrice += item.salePrice !== null ? item.salePrice : item.originalPrice));
    setTotalPrice(tempPrice);
  }, [cart]);

  return (
    <main>
      <div className="cart-container">
        <h2 className="cart-title">Cart</h2>
        <div className="cart">
          <div className="cart--bar">
            <h4 className="cart--bar__title">Product</h4>
            <h4 className="cart--bar__title">Price</h4>
          </div>
          <div className="cart--table">
            {cart.map((item) => (
              <CartProduct cart={cart} setCart={setCart} product={item} key={item.id} />
            ))}
          </div>
        </div>
        {/* ... rest of your component code ... */}
      </div>

      {/* Inject the first snippet just before the closing </head> tag */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11277191164"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-11277191164');
          `,
        }}
      ></script>

      {/* Inject the second snippet just before the closing </head> tag */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {'send_to': 'AW-11277191164/ejZnCO-K-MUYEPyPsYEq'});
          `,
        }}
      ></script>
    </main>
  );
}

export default Cart;
