import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import qs from "qs";

// Create context with default value
const UserContext = React.createContext<UserContextInterface>({
  user: null,
  authenticated: false,
  isLoading: true,
});

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const { data: userData, isLoading } = useQuery("user", fetchUser, {
    refetchOnWindowFocus: false,
  });

  let userContextValue: UserContextInterface = {
    authenticated: false,
    user: null,
    isLoading,
  };
  if (userData) {
    if (userData.authenticated)
      userContextValue = { ...userData, isLoading: false };
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Fetch the strapi user logged in if there is a jwt in local storage
const fetchUser = () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return { authenticated: false, user: null };
  }

  // const queryParams = qs.stringify(
  //   {
  //     //populate: ['profile_picture', 'reports_to', 'teams'],
  //     populate: {
  //       role: { populate: "*" },
  //       resource: {
  //         // level 1
  //         populate: {
  //           task: "*",
  //         },
  //       },
  //     },
  //   },
  //   { encodeValuesOnly: true }
  // );

  return axios
    .get("http://localhost:1337/api/users/me", {
      headers: { Authorization: "Bearer" + " " + token },
    })
    .then((res) => {
      if (res.status === 200) {
        return { authenticated: true, user: { ...res.data } };
      } else {
        return { authenticated: false, user: null };
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        // localStorage.removeItem("jwt");
        // window.location.reload();
      }
      return { authenticated: false, user: null };
    });
};

interface UserInterface {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: string;
  blocked: false;
  createdAt: string;
  updatedAt: string;
  employee_id: number;
  employee_full_name: string;
  // resource: {
  //   id: number;
  //   task: {
  //     file_no: number;
  //     status: string;
  //     remarks: string;
  //     start_date: string;
  //     end_date: string;
  //     reviewer: string;
  //     est: string;
  //     effort: string;
  //   };
  // };
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
  };
}

interface UserContextInterface {
  user: UserInterface | null;
  authenticated: boolean;
  isLoading: boolean;
}

export type { UserInterface };
export default UserContext;
