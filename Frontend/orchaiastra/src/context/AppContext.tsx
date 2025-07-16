import { createContext, useState, useEffect, use } from "react";

export type ProfileData = {
  email?: string;
  username?: string;
};

export const AppContext = createContext<{
  authToken: string | undefined;
  setAuthToken: (auth: string) => void;
  profileData?: ProfileData;
  setProfileData?: (data: ProfileData) => void;
}>({
  authToken: undefined,
  setAuthToken: () => {},
});

export const AUTH_TOKEN = "auth_token";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const Provider = AppContext.Provider;

  const [profileData, setProfileData] = useState<ProfileData | undefined>(
    undefined
  );
  const [authToken, setAuthToken] = useState<string | undefined>(() => {
    const authDetails = localStorage.getItem(AUTH_TOKEN);
    if (authDetails) {
      return JSON.parse(authDetails);
    }
    return undefined;
  });

  useEffect(() => {
    if (authToken) {
      const fetchProfile = async () => {
        const response = await fetch("http://localhost:8000/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const res = response.json() as any;
        if (response.ok && !res?.email && !res?.username) {
          setAuthToken(undefined);
          localStorage.removeItem(AUTH_TOKEN);
        } else if (response.ok) {
          setProfileData({
            email: res?.email,
            username: res?.username,
          });
        }
      };
      fetchProfile();
    }
  }, [authToken]);

  const setFinalAuthToken = (auth: string) => {
    setAuthToken(auth);
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(auth));
  };

  return (
    <Provider
      value={{
        authToken: authToken,
        setAuthToken: setFinalAuthToken,
        profileData: profileData,
      }}
    >
      {children}
    </Provider>
  );
};
