import React from "react";
import { Dropdown, Input, Typography } from "neetoui";
import { Search, Filter as FilterIcon } from "neetoicons";

const Filter = ({ searchTerm, setSearchTerm, updateQueryParams }) => {
  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value);
    updateQueryParams({ searchTerm: value });
  };

  return (
    <div className="flex w-1/3 flex-row items-center justify-center space-x-4">
      <Input
        placeholder="Search for a quiz"
        prefix={<Search />}
        value={searchTerm}
        onChange={handleChange}
        size="large"
      />
      <Dropdown
        buttonStyle="text"
        size="large"
        icon={FilterIcon}
        strategy="fixed"
      >
        <div className="p-4">
          <Typography style="h4">No filters yet.</Typography>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filter;
