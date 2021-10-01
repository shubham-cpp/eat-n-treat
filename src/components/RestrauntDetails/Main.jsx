import React from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "../useLocalStorage";
import Cart from "./Cart";
import Details from "./Details";
import ReviewsList from "./ReviewsList";

export function Main() {
  const { id } = useParams();
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  const addToCart = (dish) => {
    if (
      localStorage.getItem("rID") === id ||
      localStorage.getItem("rID") === null
    ) {
      const exist = cartItems.find((item) => item._id === dish._id);

      if (exist) {
        setCartItems(
          cartItems.map((item) =>
            item._id === dish._id ? { ...exist, qty: exist.qty + 1 } : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...dish, qty: 1 }]);

        localStorage.setItem("rID", id);
      }
    }
  };

  const removeFromCart = (dish) => {
    const exist = cartItems.find((item) => item._id === dish._id);
    // Remove item from cart
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item._id !== dish._id));
      localStorage.removeItem("rID");
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === dish._id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }

    // setTotalItems(cartItems.reduce(calculateQty, 0));
  };

  return (
    <div className="container">
      <div className="col">
        <Details addToCart={addToCart} />
      </div>
      <div className="col">
        <Cart
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
          total={cartItems.length}
        />
      </div>

      {/* <button className="btn btn-outline-primary">
        <Link
          to={`/restaurant/edit/${id}`}
          style={{ textDecoration: "none", color: "whitesmoke" }}
        >
          Edit Restaurant
        </Link>
  </button> */}

      <div>
        <ReviewsList id={id} />
      </div>
    </div>
  );
}
