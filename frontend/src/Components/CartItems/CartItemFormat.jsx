import React from "react";

const format = [
  { title: "Product" },
  { title: "Title" },
  { title: "Price" },
  { title: "Quantity" },
  { title: "Total" },
  { title: "Remove" },
];

const CartItemFormat = () => {
  return (
    <div className="cartitem-format-main">
      {format.map((form) => {
        return <p>{form.title}</p>;
      })}
    </div>
  );
};

export default CartItemFormat;
