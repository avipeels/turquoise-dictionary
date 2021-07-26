import React, { useState } from "react";
import TextBox from "@mycomp/textbox";
import Label from "@mycomp/label";
import Button from "@mycomp/button";
import axios from "axios";
import "../App.css";
import { StyledForm, StyledGroup } from "../styles";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const validateUser = (username, password) => {
    return axios.post(
      "http://localhost:5000/login",
      {
        username,
        password,
      },
      {
        "content-type": "application/json; charset=utf-8",
        vary: "origin",
        "access-control-expose-headers":
          "WWW-Authenticate,Server-Authorization",
      }
    );
  };
  const handleLoginClick = async () => {
    const isValidUser = await validateUser(username, password);
    if (isValidUser) history.push("/dashboard");
    // console.log(isValidUser);
  };
  return (
    <div className="App">
      <header className="App-header">
        <StyledForm>
          <StyledGroup>
            <Label forField="username" name="Username" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              value={username}
              required
              placeholder="enter username"
            />
          </StyledGroup>
          <StyledGroup>
            <Label forField="password" name="Password" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              name="password"
              id="password"
              value={password}
              required
              placeholder="enter password"
            />
          </StyledGroup>
          <button type="button" name="Login" onClick={handleLoginClick}>
            Login
          </button>
        </StyledForm>
      </header>
    </div>
  );
};

export default Login;
