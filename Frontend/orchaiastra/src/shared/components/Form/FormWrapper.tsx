import { FormProvider } from "./FormContext";
import { Form } from "./Form";

import type { FC } from "react";
import type { FormProps } from "./Form";

export const FormWrapper: FC<FormProps> = (props) => {
  return (
    <FormProvider>
      <Form {...props} />
    </FormProvider>
  );
};
