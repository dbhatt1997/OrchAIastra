import { FormWrapper } from "../../shared/components/Form/FormWrapper";
import { Label } from "../../shared/components/Label/Label";
import { Button } from "../../shared/components/Button/Button";
import { Container } from "../../shared/components/Container/Container";
import { Logo } from "../../shared/components/Logo/Logo";
import { Link } from "react-router-dom";

import useStyles from "./styles";

export const Signup = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.logoContainer}>
        <Logo color="black" className={classes.logo} />
      </div>
      <Container className={classes.loginForm}>
        <Label fontSize={28} fontWeight={600}>
          Sign Up
        </Label>
        <FormWrapper
          disableGutters
          input={[
            {
              id: "username",
              label: "Username",
              placeholder: "Enter username",
              required: true,
            },
            {
              id: "email",
              label: "Email",
              placeholder: "Enter Email",
              required: true,
            },
            {
              id: "password",
              label: "Password",
              placeholder: "Enter Password",
              required: true,
            },
          ]}
        />
        <Button
          className={classes.loginButton}
          title={"Sign Up"}
          onClick={() => console.log("Login clicked")}
        />
        <div className={classes.register}>
          Already a member?{" "}
          <span className={classes.link}>
            <Link to={"/login"}>Login</Link>{" "}
          </span>
        </div>
      </Container>
    </>
  );
};
