import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { transformTagData, dropdownOptions } from "../utils/utils";
import { useStore } from "../store";

export type ProfileData = {
  email?: string;
  username?: string;
};

export type TagResponse = {
  id: number;
  tag_name: string;
  description: string;
};

export type TagsDropDown = {
  value: string;
  label: string;
}[];

export const AppContext = createContext<{
  authToken: string | undefined;
  setAuthToken: (auth: string) => void;
  profileData?: ProfileData;
  setProfileData?: (data: ProfileData) => void;
  tags?: Record<string, string>;
  tagsDropdown?: TagsDropDown;
  setTagChange?: (change: boolean) => void;
  logout?: () => void;
}>({
  authToken: undefined,
  setAuthToken: () => {},
  profileData: undefined,
  setProfileData: () => {},
  tags: {},
  tagsDropdown: [],
  setTagChange: () => {},
  logout: () => {},
});

export const AUTH_TOKEN = "auth_token";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const Provider = AppContext.Provider;

  const [profileData, setProfileData] = useState<ProfileData | undefined>(
    undefined
  );

  const [tagChange, setTagChange] = useState<boolean>(false);

  const navigate = useNavigate();

  const [tags, setTags] = useState<Record<string, string>>({});
  const [tagsDropdown, setTagsDropdown] = useState<TagsDropDown>([]);

  const [authToken, setAuthToken] = useState<string | undefined>(() => {
    const authDetails = localStorage.getItem(AUTH_TOKEN);
    if (authDetails) {
      return JSON.parse(authDetails);
    }
    return undefined;
  });

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN);
    setAuthToken(undefined);
    setProfileData(undefined);
    setTags({});
    setTagsDropdown([]);
    useStore.getState().reset();
    navigate("/login");
  }, [navigate]);

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
        const res = await response.json();
        console.log(res);
        if (response.ok && res?.email && res?.username) {
          setProfileData({
            email: res?.email,
            username: res?.username,
          });
        } else {
          logout();
        }
      };
      fetchProfile();
    }
  }, [authToken, navigate, logout]);
  console.log(profileData);

  useEffect(() => {
    if (authToken && (authToken || tagChange)) {
      const getTags = async () => {
        const response = await fetch("http://localhost:8000/tags", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const res = await response.json();
        if (res) {
          const tags = transformTagData(res);
          setTagsDropdown(dropdownOptions(tags));
          setTags(tags);
        }
      };
      getTags();
    }
  }, [authToken, tagChange]);

  const setFinalAuthToken = useCallback((auth: string) => {
    setAuthToken(auth);
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(auth));
  }, []);

  return (
    <Provider
      value={{
        authToken: authToken,
        setAuthToken: setFinalAuthToken,
        profileData: profileData,
        tags: tags,
        tagsDropdown: tagsDropdown,
        setTagChange: setTagChange,
        logout: logout,
      }}
    >
      {children}
    </Provider>
  );
};
