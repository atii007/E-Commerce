import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="box-navigator">
        <div className="box-nav">Description</div>
        <div className="box-nav fade">Reviews (122)</div>
      </div>
      <div className="box-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          placeat sunt odit exercitationem provident delectus, consectetur rem
          facilis molestiae commodi blanditiis recusandae aliquid cumque sequi!
          Nihil ea minus architecto sunt eveniet, totam, perferendis quam, nulla
          officiis provident quae doloribus harum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          odio? Deleniti sunt excepturi autem rem. Quam asperiores beatae
          accusamus sint reiciendis optio ex veniam aut architecto praesentium,
          rem totam omnis?
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
