import React, { useState } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { useQuizzesFetch } from "hooks/reactQuery/useQuizzesApi";
import { Delete } from "neetoicons";
import { Button } from "neetoui";

import DeleteAlert from "./DeleteAlert";
import NewQuizPane from "./Pane/Create";
import Table from "./Table";

3;

const Quizzes = () => {
  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedQuizSlugs, setSelectedQuizSlugs] = useState([]);

  // const { searchKey = "", status = "", category = "" } = useQueryParams();

  const [searchTerm, setSearchTerm] = useState("");

  const { data: { data: { quizzes = [] } = {}, isLoading } = {} } =
    useQuizzesFetch();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Header
        title="All Quizzes"
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add new quiz"
            size="small"
            onClick={() => setShowNewQuizPane(true)}
          />
        }
        searchProps={{
          value: searchTerm,
          onChange: e => setSearchTerm(e.target.value),
        }}
      />
      {quizzes.length ? (
        <>
          <SubHeader
            rightActionBlock={
              <Button
                disabled={!selectedQuizSlugs.length}
                icon={Delete}
                label="Delete"
                size="small"
                onClick={() => setShowDeleteAlert(true)}
              />
            }
          />
          <Table
            quizzes={quizzes}
            selectedQuizSlugs={selectedQuizSlugs}
            setSelectedQuizSlugs={setSelectedQuizSlugs}
          />
        </>
      ) : (
        <EmptyState
          image={<EmptyQuizzesListImage />}
          primaryAction={() => setShowNewQuizPane(true)}
          primaryActionLabel="Add new quiz"
          subtitle="Create your first quiz to get started."
          title="Looks like you don't have any quizzes!"
        />
      )}
      <NewQuizPane
        setShowPane={setShowNewQuizPane}
        showPane={showNewQuizPane}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedQuizSlugs={selectedQuizSlugs}
          setSelectedQuizSlugs={setSelectedQuizSlugs}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </Container>
  );
};

export default Quizzes;
