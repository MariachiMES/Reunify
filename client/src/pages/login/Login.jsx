import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";
import {Button, TextField, Box} from "@mui/material";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: {
          ...formState,
        },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.log(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Box className="flex-row justify-center mb-4" margin={10}>
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <Box component={"form"} onSubmit={handleFormSubmit} sx={{
                '& .MuiTextField-root': { m:1 ,width: '25ch' },
                '& .MuiButton-root': { m:1 , width: '25ch' },
              }}>
                <Box>
                  <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                  />
                  <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                  />
                </Box>
                <Box>
                  <Button
                      style={{ cursor: "pointer",right: 1}}
                      type="submit"
                      variant={"outlined"}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;
