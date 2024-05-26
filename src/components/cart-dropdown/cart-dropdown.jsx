import "./cart-dropdown.scss";
import { useState } from "react";
import Button from "../button/button.component";
const CartDropdown = () => {
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'></div>
      <Button>Go to CheckOUT</Button>
    </div>
  );
};

export default CartDropdown;
