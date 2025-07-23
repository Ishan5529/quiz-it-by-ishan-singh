import { routes } from "routes";
import React, { useState, useEffect } from "react";

import { Button } from "neetoui";
import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import Scrollable from "@bigbinary/neeto-molecules/Scrollable";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { usePublicQuizzesFetch } from "hooks/reactQuery/usePublicQuizzesApi";
import useQueryParams from "hooks/useQueryParams";
import useFuncDebounce from "hooks/useFuncDebounce";
import { useAuthState } from "contexts/auth";

import Filter from "./Filter";
import QuizCard from "./QuizCard";

const Public = () => {
  const { isAdmin } = useAuthState();

  const { data: { data: { quizzes } = {} } = {}, isLoading } =
    usePublicQuizzesFetch();

  const buttonDestination = isAdmin
    ? routes.dashboard.quizzes.index
    : routes.auth.login;
  const buttonLabel = isAdmin ? "Go to dashboard" : "Login as admin";

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
        title="BigBinary Academy"
        actionBlock={
          <Button label={buttonLabel} to={buttonDestination} type="primary" />
        }
      />
      <div className="mb-12 mt-12 flex w-full items-center justify-center">
        <Filter />
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
