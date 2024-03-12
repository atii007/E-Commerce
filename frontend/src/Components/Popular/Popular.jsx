import React, { useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import axios from "axios";
import { useState } from "react";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://shopper-afb67-default-rtdb.asia-southeast1.firebasedatabase.app/popular_collections.json"
      )
      .then((res) => {
        setPopularProducts(res.data);
      });
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
