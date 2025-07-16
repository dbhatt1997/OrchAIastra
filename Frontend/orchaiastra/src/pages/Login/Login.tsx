import { useContext } from "react";

import { FormWrapper } from "../../shared/components/Form/FormWrapper";
import { Label } from "../../shared/components/Label/Label";
import { Button } from "../../shared/components/Button/Button";
import { Container } from "../../shared/components/Container/Container";
import { Logo } from "../../shared/components/Logo/Logo";
import { Link } from "react-router-dom";
import { useNotification } from "../../shared/components/Snackbar/Snackbar";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";

const FORM_ID = "login-form";

export const Login = () => {
  const { setAuthToken } = useContext(AppContext);

  const navigate = useNavigate();

  const { showNotification } = useNotification();

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
          formId={FORM_ID}
          disableGutters
          input={[
            {
              id: "username",
              label: "Username",
              placeholder: "Enter username",
              required: true,
              type: "text",
            },
            {
              id: "password",
              label: "Password",
              placeholder: "Enter password",
              type: "password",
              required: true,
            },
          ]}
          rules={[
            {
              id: "password",
              rule: "^[a-zA-Z0-9]{8,}$",
              message: "Password must be at least 8 characters long.",
            },
          ]}
          onSubmit={async (_, values) => {
            const response = await fetch("http://localhost:8000/login", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const res = await response.json();
            if (response.ok) {
              setAuthToken(res?.access_token);
              showNotification(res?.message, "success");
              navigate("/home");
            } else {
              showNotification(
                (res as any)?.detail[0]?.msg ?? res?.detail,
                "error"
              );
            }
          }}
        />
        <Button
          className={classes.loginButton}
          title={"Login"}
          onClick={() => {
            const form = document.getElementById(FORM_ID) as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
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
