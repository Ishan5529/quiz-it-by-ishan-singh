import React from "react";
import { Typography, Button, Input } from "neetoui";
import { Search, Filter as FilterIcon } from "neetoicons";

const Filter = () => (
  <div className="flex w-1/3 flex-row items-center justify-center space-x-4">
    <Input
      placeholder="Search for a quiz"
      prefix={<Search />}
      onChange={() => {}}
      size="large"
    />
    <FilterIcon />
  </div>
);

export default Filter;
