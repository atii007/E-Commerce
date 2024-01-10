import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/Context";
import remove_icon from "../Assets/cart_cross_icon.png";
import CartItemFormat from "./CartItemFormat";

const CartItems = () => {
  const { all_product, cartItem, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <CartItemFormat />
      <hr />
      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="cartitem-format cartitem-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitem-quantity">{cartItem[e.id]}</button>
                <p>${e.new_price * cartItem[e.id]}</p>
                <img
                  className="cartitem-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitem-down">
        <div className="cartitem-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-totalitem">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-totalitem">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-totalitem">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-promo">
          <p>If You have a Promo Code, Enter it here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
