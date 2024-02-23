import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PublicRouteSwitch from "./components/routes/PublicRouteSwitch";
import { UserContextProvider } from "./context/UserContext.tsx";
import AuthAppCheck from "./features/authentication/components/AuthAppCheck";
import React from "react";
import MainLayout from "./layouts/MainLayout.js";

const queryClient = new QueryClient();

function App() {
  const AuthApp = <MainLayout />;

  const PublicApp = <PublicRouteSwitch />;

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <AuthAppCheck authApp={AuthApp} publicApp={PublicApp} />
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
