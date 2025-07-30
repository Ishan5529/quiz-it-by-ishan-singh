import React from "react";
import { Dropdown, Input, Typography } from "neetoui";
import { Search, Filter as FilterIcon } from "neetoicons";
import withT from "utils/withT";
import { CATEGORIES } from "components/Dashboard/Quizzes/constants";
import Select from "react-select";

const Filter = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  updateQueryParams,
  t,
}) => {
  const handleSearchChange = ({ target: { value } }) => {
    setSearchTerm(value);
    updateQueryParams({ searchTerm: value });
  };

  const handleCategoryChange = selectedOptions => {
    const categories = selectedOptions
      ? selectedOptions.map(option => option.value)
      : [];
    setSelectedCategories(categories);
    updateQueryParams({ category: categories });
  };

  return (
    <div className="flex w-1/3 flex-row items-center justify-center space-x-4">
      <Input
        placeholder={t("placeholders.quizSearch")}
        prefix={<Search />}
        value={searchTerm}
        onChange={handleSearchChange}
        size="large"
      />
      <Dropdown
        buttonStyle="text"
        className="h-24 w-64 p-4"
        size="large"
        icon={FilterIcon}
      >
        <div className="w-full" onClick={event => event.stopPropagation()}>
          <Typography style="h4">{t("labels.category")}</Typography>
          <Select
            isClearable
            isMulti
            className="absolute mt-2 w-full flex-grow-0"
            name="category"
            placeholder={t("placeholders.category")}
            options={CATEGORIES.map(category => ({
              label: category,
              value: category,
            }))}
            value={selectedCategories?.map(cat => ({ label: cat, value: cat }))}
            onChange={handleCategoryChange}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default withT(Filter);
