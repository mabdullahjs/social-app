import {
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signUpUser } from "../config/Firebase/firebaseMethod";
import { useNavigate } from "react-router-dom";
import MAButton from "../config/components/MAButton";
import MAInput from "../config/components/MAInput";

function Register() {

  //useNavigate
  const navigate = useNavigate();

  //form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  //register user
  const registerUser = () => {
    setLoader(true)
    const obj = {
      email: email,
      password: password,
    };
    signUpUser(obj)
      .then((res) => {
        setLoader(false)
        console.log(res);
        navigate('/')
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography className="mb-4" variant="h4">
        Register User
      </Typography>
      <MAInput className="mb-3" label="Email" type="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} width="25rem" value={email}/>
      <MAInput className="mb-3" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} width="25rem"/>
      <Box className="mt-5 mb-5"> 
      <MAButton loading={loader} label="register" size="large" onClick={registerUser} />
      </Box>
      <Typography
        sx={{ cursor: "pointer" }}
        className="text-primary mt-2"
        onClick={() => navigate("/")}
      >
        Already a user Please Login!
      </Typography>
    </Box>
  );
}

export default Register;
