import * as React from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 925,
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
        {" "}
        Cart{" "}
      </button>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <div id="login-modal-description" className="paperLogin">
            <aside className="col dishes">
              <h3>Cart Items</h3>
              <div className="container" style={{overflow:"scroll",maxHeight:"300px"}}>
                {cartItems.length === 0 && <p>Cart is empty</p>}
                {cartItems.map((item) => (
                  <div key={item._id} className="row">
                    <div className="col">{item.menuName}</div>
                    <div className="col">
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                    <div className="col">
                      <button onClick={() => removeFromCart(item)}>-</button>
                    </div>
                    <div className="col">
                      {item.qty} x Rs. {item.menuPrice}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <button className="btn btn-primary">
              Place Order
              {
                // TODO: Total is one behind actual value
              }
              <span class="badge badge-light">{total > 0 && total}</span>
            </button>
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
