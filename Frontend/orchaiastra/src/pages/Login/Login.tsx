import { FormWrapper } from "../../shared/components/Form/FormWrapper";
import { Label } from "../../shared/components/Label/Label";
import { Button } from "../../shared/components/Button/Button";
import { Container } from "../../shared/components/Container/Container";
import { Logo } from "../../shared/components/Logo/Logo";
import { Link } from "react-router-dom";

import useStyles from "./styles";

export const Login = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.logoContainer}>
        <Logo color="black" className={classes.logo} />
      </div>
      <Container className={classes.loginForm}>
        <Label fontSize={28} fontWeight={600}>
          Login
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
              id: "password",
              label: "Password",
              placeholder: "Enter password",
              required: true,
            },
          ]}
        />
        <Button
          className={classes.loginButton}
          title={"Login"}
          onClick={() => console.log("Login clicked")}
        />
        <div className={classes.register}>
          Not Registered?{" "}
          <span className={classes.link}>
            {" "}
            <Link to={"/signup"}>Sign Up</Link>
          </span>
        </div>
      </Container>
    </>
  );
};
