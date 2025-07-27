import React from "react";

import { useAuthState } from "contexts/auth";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { isPresent } from "utils";

const PageNotFound = () => {
  const history = useHistory();
  const { authToken, isAdmin } = useAuthState();
  const { t } = useTranslation();

  const isLoggedIn = isPresent(authToken) && isAdmin;
  const homeUrl = isLoggedIn ? routes.dashboard.index : routes.public.index;

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex w-screen flex-row items-center justify-center space-x-12 bg-purple-50 shadow-2xl">
        <Typography className="text-[200px] font-thin">404</Typography>
        <div className="flex h-full flex-col justify-between">
          <Typography className="h-full w-72 text-2xl font-semibold">
            {t("misc.noPage")}
          </Typography>
          <div>
            <Button
              className="mt-4"
              label={t("labels.backHome")}
              size="large"
              style="primary"
              onClick={() => history.push(homeUrl)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
