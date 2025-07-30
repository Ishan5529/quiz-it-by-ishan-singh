import React from "react";

import {
  QUIZZES_FILTER_FORM_VALIDATION_SCHEMA,
  CATEGORIES,
} from "components/Dashboard/Quizzes/constants";
import { Pane, Typography } from "neetoui";
import withT from "utils/withT";

import Form from "./Form";

const Filter = ({
  searchTerm,
  status,
  category,
  showPane,
  setShowPane,
  setSearchTerm,
  setStatus,
  setCategory,
  updateQueryParams,
  t,
}) => {
  const QUIZZES_FILTER_INITIAL_FORM_VALUES = {
    filterTitle: searchTerm,
    status,
    category: category.map(cat => ({ label: cat, value: cat })),
  };

  const onClose = () => {
    setShowPane(false);
  };

  const handleFilterSubmit = values => {
    setSearchTerm(values.filterTitle);
    setStatus(values.status?.value);
    const categoryValues = values.category.map(cat => cat.value);
    if (categoryValues.length === 0) {
      setCategory([]);
    } else {
      setCategory(categoryValues);
    }

    updateQueryParams({
      search_term: values.filterTitle,
      status: values.status?.value,
      category: categoryValues,
    });
  };

  const clearFilter = values => {
    values.filterTitle = "";
    values.status = "";
    values.category = [];
    setSearchTerm("");
    setStatus("");
    setCategory([]);
    updateQueryParams({
      searchTerm: "",
      status: "",
      category: [],
    });
    onClose();
  };

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {t("quizzes.filters")}
        </Typography>
      </Pane.Header>
      <Form
        {...{
          isFilter: true,
          clearFilter,
          handleFilterSubmit,
          data: QUIZZES_FILTER_INITIAL_FORM_VALUES,
          validationSchema: QUIZZES_FILTER_FORM_VALIDATION_SCHEMA,
          onClose,
          CATEGORIES,
        }}
      />
    </Pane>
  );
};

export default withT(Filter);
