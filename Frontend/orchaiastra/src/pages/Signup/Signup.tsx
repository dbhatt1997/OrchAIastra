import { FormWrapper } from "../../shared/components/Form/FormWrapper";
import { Label } from "../../shared/components/Label/Label";
import { Button } from "../../shared/components/Button/Button";
import { Container } from "../../shared/components/Container/Container";
import { Logo } from "../../shared/components/Logo/Logo";
import { Link } from "react-router-dom";
import { useNotification } from "../../shared/components/Snackbar/Snackbar";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";

const FORM_ID = "signup-form";

export const Signup = () => {
  const { showNotification } = useNotification();

  const navigate = useNavigate();

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
          formId={FORM_ID}
          disableGutters
          input={[
            {
              id: "username",
              label: "Username",
              placeholder: "Enter username",
              type: "text",
              required: true,
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "Enter Email",
              required: true,
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter Password",
              required: true,
            },
          ]}
          rules={[
            {
              id: "email",
              rule: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              message: "Invalid email format",
            },
            {
              id: "password",
              rule: "^[a-zA-Z0-9@]{8,}$",
              message: "Password must be at least 8 characters long.",
            },
          ]}
          onSubmit={async (_, values) => {
            console.log("Signup values:", values);
            const response = await fetch("http://localhost:8000/signup", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const res = await response.json();
            if (response.ok) {
              showNotification("Successfully Signed Up", "success");
              navigate("/login");
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
          title={"Sign Up"}
          onClick={() => {
            const form = document.getElementById(FORM_ID) as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
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
