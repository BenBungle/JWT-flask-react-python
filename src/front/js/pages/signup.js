import React, { useState } from "react";
import { Context } from "../store/appContext";

export const Signup = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("https://benbungle-laughing-disco-w6g4q49x5wrhg49v-3001.preview.app.github.dev/api/signup", options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("There was an error with the request.");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log("Registration successful!");
      })
      .catch((error) => {
            if (error.message === "There was an error with the request.") {
              setErrorMessage("There was an error with the registration.");
            } else {
              setErrorMessage("You are already signed up. Please log in.");
            }
            console.error("There was an error with the registration.", error);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
