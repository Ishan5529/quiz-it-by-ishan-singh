import React, { useEffect, useState } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/commons/PrivateRoute";
import Public from "components/Public";
import { AUTH_ROUTES, PRIVATE_ROUTES } from "components/routeConstants";
import { useAuthState, useAuthDispatch } from "contexts/auth";
import { useUserDispatch, useUserState } from "contexts/user";
import PropTypes from "prop-types";
import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routes } from "src/routes";
import { isPresent } from "utils";
import queryClient from "utils/queryClient";
import {
  clearLocalStorageCredentials,
  getFromLocalStorage,
} from "utils/storage";

import UserRegistration from "./Public/Attempts/UserRegistration";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { authToken, isAdmin } = useAuthState();
  const { user: userContextState } = useUserState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const currentUser = userContextState || props?.user;
  const isLoggedIn = isPresent(authToken) && isPresent(currentUser);

  useEffect(() => {
    userDispatch({ type: "SET_USER", payload: { user: props?.user } });
    initializeLogger();
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, [authDispatch, props?.user, userDispatch]);

  useEffect(() => {
    const previousLoginAuthEmail = getFromLocalStorage("authEmail");
    const hasDeviseUserSessionExpired = !props?.user;
    const sessionExpiredButLocalStorageCredsExist =
      hasDeviseUserSessionExpired && previousLoginAuthEmail;

    if (sessionExpiredButLocalStorageCredsExist) clearLocalStorageCredentials();
  }, [props?.user?.email]);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          {AUTH_ROUTES.map(route => (
            <Route
              exact
              component={route.component}
              key={route.path}
              path={route.path}
            />
          ))}
          <Route exact component={Public} path={routes.public.index} />
          <Route
            exact
            component={UserRegistration}
            path={routes.public.quizzes.registration}
          />
          {PRIVATE_ROUTES.map(route => (
            <PrivateRoute
              component={route.component}
              condition={isLoggedIn && isAdmin}
              key={route.path}
              path={route.path}
              redirectRoute={routes.public.index}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
