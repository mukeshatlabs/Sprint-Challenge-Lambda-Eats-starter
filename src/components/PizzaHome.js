import React from "react";
import { Link } from "react-router-dom";
import pizza from "../Assets/Pizza.png"; 
import "../index.css";

const PizzaHome = () => {
  return (
    <div className="pizzahome">
      <h1>Mukesh Fake Pizza Store</h1>
      <img src={pizza} alt="Lets order pizza!"></img>
      <Link to={`/pizza`}>
        <h2>Click Here to Order Your Fake Pizza</h2>
      </Link>
    </div>
  );
};
export default PizzaHome;
