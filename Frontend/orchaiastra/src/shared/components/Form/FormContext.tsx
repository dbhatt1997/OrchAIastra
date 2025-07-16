import { createContext, useState } from "react";

export const FormContext = createContext<{
  values: Record<string, string>;
  setValues: (data: Record<string, any>) => void;
  error: Record<string, any>;
  setErrors: (errors: Record<string, any>) => void;
  getValues: () => Record<string, any>;
}>({
  values: {},
  setValues: () => {},
  error: {},
  setErrors: () => {},
  getValues: () => ({}),
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const Provider = FormContext.Provider;
  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setErrors] = useState<Record<string, any>>({});
  const getValues = () => values;

  return (
    <Provider
      value={{
        values: values,
        setValues: setValues,
        error: error,
        setErrors: setErrors,
        getValues: getValues,
      }}
    >
      {children}
    </Provider>
  );
};
