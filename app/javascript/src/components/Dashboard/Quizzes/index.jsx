import React, { useState, useEffect } from "react";

import notesApi from "apis/notes";
import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { Delete } from "neetoicons";
import { Button, PageLoader } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";

import DeleteAlert from "./DeleteAlert";
import NewQuizPane from "./Pane/Create";
import Table from "./Table";

const Quizzes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuizIds, setSelectedQuizIds] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const {
        data: { notes: quizzes },
      } = await notesApi.fetch();
      setQuizzes(quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
                disabled={!selectedQuizIds.length}
                icon={Delete}
                label="Delete"
                size="small"
                onClick={() => setShowDeleteAlert(true)}
              />
            }
          />
          <Table
            fetchQuizzes={fetchQuizzes}
            quizzes={quizzes}
            selectedQuizIds={selectedQuizIds}
            setSelectedQuizIds={setSelectedQuizIds}
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
        fetchQuizzes={fetchQuizzes}
        setShowPane={setShowNewQuizPane}
        showPane={showNewQuizPane}
      />
      {showDeleteAlert && (
        <DeleteAlert
          refetch={fetchQuizzes}
          selectedQuizIds={selectedQuizIds}
          setSelectedQuizIds={setSelectedQuizIds}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </Container>
  );
};

export default Quizzes;
