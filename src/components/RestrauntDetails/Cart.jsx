import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #141414",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  justifyContent: "space-between",
};

export default function Cart({ cartItems, addToCart, removeFromCart, total }) {
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenLogin = () => {
    setOpenLogin((prev) => !prev);
  };

  return (
    <div>
      <button
        className="btn btn-outline-success float-end m-2"
        onClick={handleOpenLogin}
      >
        <img
          width="30px"
          height="30px"
          src="https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/64/000000/external-cart-retail-store-inipagistudio-lineal-color-inipagistudio.png"
        />{" "}
        Cart{" "}
        <span>
          <sup style={{ color: "coral", fontWeight: "bold" }}>
            {cartItems.length > 0 && cartItems.length}
          </sup>
        </span>
      </button>

      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box sx={style}>
          <h3 style={{ marginLeft: "10rem" }}>Cart Items</h3>
          <div id="cart-modal-description" className="cart-desc">
            <aside className="col dishes">
              <div
                className="container"
                style={{
                  overflow: "scroll",
                  maxHeight: "300px",
                  paddingBottom: "20px",
                }}
              >
                {cartItems.length === 0 && <p>Cart is empty</p>}
                {cartItems.map((item) => (
                  <div key={item._id} className="row">
                    <div className="col">{item.menuName}</div>
                    <div className="col">
                      <button
                        className="add-btn"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="add-btn"
                        onClick={() => removeFromCart(item)}
                      >
                        -
                      </button>
                    </div>
                    <div className="col">
                      {item.qty} x Rs. {item.menuPrice}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {sessionStorage.getItem("custId") === null ? (
              <h5 style={{ marginLeft: "10rem" }}>Login to continue</h5>
            ) : (
              <Link
                disabled={cartItems.length === 0}
                className="btn btn-primary"
                to="/checkout"
                style={{ marginLeft: "12rem" }}
              >
                Checkout
              </Link>
            )}
          </div>
        </Box>
      </Modal>
      {/* <Route path="/place-order">
        <Cart
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
          total={total}
        />
      </Route> */}
    </div>
  );
}
