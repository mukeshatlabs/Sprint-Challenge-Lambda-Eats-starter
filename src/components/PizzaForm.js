import React, { useState, useEffect } from "react";
import * as yup from "yup"; 
import axios from "axios";

export default function PizzaForm() {
  // name (at least 2 chars), size (dropdown), toppings (checlist), special instructions (text area), order button
  const initialFormState = {
    name: "",
    pizzasize: "",
    pepperoni: false,
    sausage:false,
    olives:false,
    mushrooms:false,
    instructions: "",
  };

  const [post, setPost] = useState();
  const [serverError, setServerError] = useState("");
  const [formState, setFormState] = useState(initialFormState);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState(initialFormState);

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    pizzasize: yup.string().required("Must choose a pizza size"),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    olives: yup.boolean(),
    mushrooms: yup.boolean(),
    instructions: yup.string()
  });

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name) // get the value out of schema at key "e.target.name" --> "name="
      .validate(e.target.value) // value in input
      .then(valid => {
        // if passing validation, clear any error
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch(err => {
        // if failing validation, set error in state
        console.log("error!", err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  // whenever state updates, validate the entire form. if valid, then change button to be enabled.
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      console.log("valid?", valid);
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  // onSubmit function
  const formSubmit = e => {
    e.preventDefault();

    // send out POST request with obj as second param, for us that is formState.
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
        // update temp state with value to display
        setPost(response.data);
        setFormState({
          name: "",
          pizzasize: "",
          pepperoni: false,
          sausage:false,
          olives:false,
          mushrooms:false,
          instructions: "",
        });

        // clear any server error
        setServerError(null);
      })
      .catch(err => {
        // this is where we could create a server error in the form!
        setServerError("oops! something happened!");
      });
  };

  // onChange function
  const inputChange = e => {
    e.persist(); // necessary because we're passing the event asyncronously and we need it to exist even after this function completes (which will complete before validateChange finishes)
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    }; // remember value of the checkbox is in "checked" and all else is "value"
    validateChange(e); // for each change in input, do inline validation
    setFormState(newFormData); // update state with new data
  };

  return (
    <form onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          onChange={inputChange}
          value={formState.name}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>

      <label htmlFor="pizzasize">
        What would you like to help with?
        <select id="pizzasize" name="pizzasize" onChange={inputChange}>
          <option value="">--Please choose a size--</option>
          <option value="Personal">Personal</option>
          <option value="Medium">Medium</option>

          <option value="Large">Large</option>

          <option value="ExtraLarge">Extra Large</option>
        </select>
        {errors.pizzasize.length > 0 ? (
          <p className="error">{errors.pizzasize}</p>
        ) : null}
      </label>

      <label>
          Add Toppings
      </label>
      <label htmlFor="pepperoni" className="checkbox">
        <input
          type="checkbox"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
        Pepperoni
      </label>
      <label htmlFor="sausage" className="checkbox">
        <input
          type="checkbox"
          name="sausage"
          checked={formState.sausage}
          onChange={inputChange}
        />
        Sausage
      </label>
      <label htmlFor="olives" className="checkbox">
        <input
          type="checkbox"
          name="olives"
          checked={formState.olives}
          onChange={inputChange}
        />
        Olives
      </label>
      <label htmlFor="mushrooms" className="checkbox">
        <input
          type="checkbox"
          name="mushrooms"
          checked={formState.mushrooms}
          onChange={inputChange}
        />
        Mushrooms
      </label>

      <label htmlFor="instructions">
        Special instructions?
        <textarea
          name="instructions"
          onChange={inputChange}
          value={formState.instructions}
        />
        {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null}
      </label>

      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={isButtonDisabled} type="submit">
        Order Pizza
      </button>
    </form>
  );
}

