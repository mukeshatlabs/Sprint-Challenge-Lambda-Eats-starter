import React from "react";
import { Route } from "react-router-dom";
import PizzaHome from "./components/PizzaHome";
import PizzaForm from "./components/PizzaForm";

const App = () => {
  return (
    <>
      <Route exact path ="/">
        <PizzaHome  />
      </Route>
      <Route path ="/pizza">
        <PizzaForm />
      </Route>
    </>
  );
};
export default App;
