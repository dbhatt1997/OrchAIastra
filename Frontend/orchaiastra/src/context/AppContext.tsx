import { createContext, useState } from "react";

type NotificationProps = {
  active?: boolean;
  message?: string;
  type?: "success" | "error" | "info";
};

export const AppContext = createContext<{
  notification: NotificationProps;
  setNotification: (data: NotificationProps) => void;
  authToken: string | undefined;
  setAuthToken: (auth: string) => void;
}>({
  notification: {},
  setNotification: () => {},
  authToken: undefined,
  setAuthToken: () => {},
});

export const AUTH_TOKEN = "auth_token";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const Provider = AppContext.Provider;
  const [notification, setNotification] = useState<NotificationProps>({});
  const [authToken, setAuthToken] = useState<string>(() => {
    const authDetails = localStorage.getItem(AUTH_TOKEN);
    if (authDetails) {
      return JSON.parse(authDetails);
    }
    return undefined;
  });

  const setAllNotifications = (data: Record<string, any>) => {
    setNotification((prev) => ({ ...prev, ...data }));
  };
  const setFinalAuthToken = (auth: string) => {
    setAuthToken(auth);
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(auth));
  };

  return (
    <Provider
      value={{
        authToken: authToken,
        setNotification: setAllNotifications,
        notification: notification,
        setAuthToken: setFinalAuthToken,
      }}
    >
      {children}
    </Provider>
  );
};
