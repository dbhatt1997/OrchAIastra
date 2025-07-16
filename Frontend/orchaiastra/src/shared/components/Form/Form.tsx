import { useContext, useCallback, Fragment } from "react";

import { FormContext } from "./FormContext";
import { Input } from "../Input/Input";

import useStyles from "./styles";

import type { FC } from "react";

type InputProps = {
  id: string;
  type?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  toolTip?: boolean;
  required?: boolean;
};
type Rules = {
  id: string;
  rule: string;
  message?: string;
};

export type FormProps = {
  formId: string;
  disableGutters?: boolean;
  input: InputProps[];
  rules?: Rules[];
  onSubmit?: (
    event: React.FormEvent<HTMLFormElement>,
    values: Record<string, string>
  ) => void;
};
export const Form: FC<FormProps> = ({
  formId,
  input,
  onSubmit,
  rules,
  disableGutters,
}) => {
  const { setValues, setErrors, values, error } = useContext(FormContext);

  const classes = useStyles({ disableGutters });

  const formValidator = useCallback(
    (value: string, id: string, required: boolean | undefined) => {
      const inputEl = document.getElementById(id) as HTMLInputElement;
      const errorEl = document.getElementById(`error-${id}`) as HTMLDivElement;
      const item = rules?.find((rule) => rule.id === id);
      if (required && !value) {
        errorEl.textContent = "This value is required";
        setErrors((prev: any) => ({ ...prev, [id]: "This value is required" }));
      } else if (item) {
        const regex = new RegExp(item.rule);
        if (!regex.test(inputEl.value)) {
          errorEl.textContent = item?.message || "Invalid input";
          setErrors((prev: any) => ({
            ...prev,
            [id]: item?.message || "Invalid input",
          }));
        } else {
          errorEl.textContent = "";
          setErrors((prev: any) => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
          setValues((prev: any) => ({ ...prev, [id]: inputEl.value }));
        }
      } else {
        setValues((prev: any) => ({ ...prev, [id]: inputEl.value }));
        errorEl.textContent = "";
        setErrors((prev: any) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [setErrors, setValues, rules]
  );

  const submitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (onSubmit && Object.keys(error).length === 0) {
        onSubmit?.(event, values);
      }
    },
    [error, values, onSubmit]
  );
  console.log("Form values:", values);
  console.log("Form errors:", error);
  return (
    <form id={formId} onSubmit={submitForm}>
      <div className={classes.formContainer}>
        {input.map((item) => {
          const { label, id, required, toolTip, value, ...rest } = item;
          return (
            <Fragment key={id}>
              <div className={classes.label}>{label}</div>
              <Input
                id={id}
                {...rest}
                onChange={(e) => formValidator(e.target.value, id, required)}
              />
              <div className={classes.error} id={`error-${id}`}></div>
            </Fragment>
          );
        })}
      </div>
    </form>
  );
};
