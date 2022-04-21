import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper"; // here another method to wrap our component

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // useRef hook->  hooks uses only inside the component,  useRef return a value that allow us to work with element for connect, read information and we can use. call it REFERENCE=> ref
  // useRef hook-> It more suitable for read information that won't be change.
  // connect it adding a special element in the input the "ref"
  const nameInputRef = useRef(); // this is an object with a current prop, holds the actual value that is connected with and storage a DOM element
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    console.log(nameInputRef.current.value); //acces to the value from DOM
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    // for validation
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "please enter a valid name and age (non-empty values).",
      });
      return;
    }
    // adding a "+" to enteredAge, convert to a Number.
    if (+enteredUserAge < 1) {
      setError({
        title: "invalid age",
        message: "please enter a valid name and age (> 0).",
      });
      return;
    }

    // pass the state from other components
    // console.log(enteredUsername, enteredAge);   previous display
    props.onAddUser(enteredName, enteredUserAge);

    // for reset --> needs to add a value in the input element  [Now from useRef]
    //**Rarely manipulate the DOM, in this case for explain and it does not alterate some elements.
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // handlers from useState
  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit"> Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
