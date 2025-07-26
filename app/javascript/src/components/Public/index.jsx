import { routes } from "routes";
import React, { useState } from "react";

import { Button } from "neetoui";
import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import Scrollable from "@bigbinary/neeto-molecules/Scrollable";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { usePublicQuizzesFetch } from "hooks/reactQuery/usePublicQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import useFuncDebounce from "hooks/useFuncDebounce";
import { useAuthState } from "contexts/auth";
import { filterNonNullAndEmpty } from "utils";
import { buildUrl } from "utils/url";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import QuizCard from "./QuizCard";

const Public = () => {
  const { searchTerm: querySearchTerm = "" } = useQueryParams();

  const [searchTerm, setSearchTerm] = useState(querySearchTerm);

  const { t } = useTranslation();

  const params = {
    searchTerm,
  };

  const { isAdmin } = useAuthState();
  const history = useHistory();

  const { data: { data: { quizzes } = {} } = {}, isLoading } =
    usePublicQuizzesFetch({
      title: querySearchTerm,
    });

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
    };

    history.push(
      buildUrl(routes.public.index, filterNonNullAndEmpty(updatedParam))
    );
  });

  const buttonDestination = isAdmin
    ? routes.dashboard.quizzes.index
    : routes.auth.login;
  const buttonLabel = isAdmin
    ? t("labels.goToDashboard")
    : t("labels.loginAsAdmin");

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <Header
        title={t("labels.organization")}
        actionBlock={
          <Button label={buttonLabel} to={buttonDestination} type="primary" />
        }
      />
      <div className="mb-12 mt-12 flex w-full items-center justify-center">
        <Filter {...{ searchTerm, setSearchTerm, updateQueryParams }} />
      </div>
      <Scrollable className="w-full gap-6 py-6">
        <div className="flex w-full flex-row flex-wrap justify-center gap-8">
          {quizzes.map((quiz, idx) => (
            <QuizCard key={idx} {...quiz} />
          ))}
        </div>
      </Scrollable>
    </Container>
  );
};

export default Public;
