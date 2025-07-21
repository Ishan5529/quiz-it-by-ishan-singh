import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

import { QUIZZES_FILTER_FORM_VALIDATION_SCHEMA } from "../constants";

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
}) => {
  const QUIZZES_FILTER_INITIAL_FORM_VALUES = {
    filterTitle: searchTerm,
    status,
    category: category.map(cat => ({ label: cat, value: cat })),
  };

  const categories = ["General", "Science", "Math", "History", "Finance"];

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
      search_term: "",
      status: "",
      category: [],
    });
    onClose();
  };

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Filters
        </Typography>
      </Pane.Header>
      <Form
        {...{
          isFilter: true,
          clearFilter,
          handleFilterSubmit,
          quiz: QUIZZES_FILTER_INITIAL_FORM_VALUES,
          validationSchema: QUIZZES_FILTER_FORM_VALIDATION_SCHEMA,
          onClose,
          categories,
        }}
      />
    </Pane>
  );
};

export default Filter;
