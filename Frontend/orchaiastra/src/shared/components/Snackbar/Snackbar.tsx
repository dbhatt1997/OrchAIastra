// NotificationContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type Notification = {
  message: string;
  severity: AlertColor;
};

type NotificationContextType = {
  showNotification: (message: string, severity?: AlertColor) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);

  const showNotification = useCallback(
    (message: string, severity: AlertColor = "info") => {
      setNotification({ message, severity });
      setOpen(true);
    },
    []
  );

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={notification.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
