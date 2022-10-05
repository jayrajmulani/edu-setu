import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm() {
  console.log("rendering login")
  const { switchToSignup } = useContext(AccountContext);
  function status(){
    console.log("check status")
    sessionStorage.setItem("logged_in",true);
    window.location.replace("/professordashboard")
  }
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" required/>
        <Input type="password" placeholder="Password" required/> 
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={status}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

export default LoginForm  