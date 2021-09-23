import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { Box, Grid, Avatar, Typography, Button, Divider, Link, Modal} from "@mui/material";
import { FormGroup} from 'react-bootstrap'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 925,
  bgcolor: 'background.paper',
  border: '1px solid #141414',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  justifyContent: 'space-between'

};

const useStyles = makeStyles((theme) => ({

    avatar: {
      margin: "0 8px"
    },

    input: {
        padding: "10px",
        lineHeight: "normal",
        textAlign: "center",
        "&&:placeholder": { color: "#f00", },
    },
    submit: {

    }
  }));

export default function Cart({ cartItems, addToCart, removeFromCart }) {
  const classes = useStyles();

  const [openLogin, setOpenLogin] = React.useState(false);
  // const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenLogin = () => {
    setOpenLogin(prev => !prev)
  };
  return (
    <div>
      <button  className="btn btn-outline-success float-end m-2" onClick={handleOpenLogin}> Cart </button>
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
        <div className="container">
          {cartItems.length === 0 && <p>Cart is empty</p>}
          {cartItems.map((item) => (
            <div key={item.menuID} className="row">
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
      <button className="btn btn-primary">Place Order</button>
          </div>
        </Box>
      </Modal>

      
    </div>
  );
}
