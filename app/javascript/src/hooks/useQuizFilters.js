import { useMemo } from "react";

import useQueryParams from "hooks/useQueryParams";

export const useQuizFilters = () => {
  const {
    searchTerm: querySearchTerm,
    page: queryPage,
    perPage: queryPerPage,
    status: queryStatus,
    category: queryCategory,
  } = useQueryParams();

  const safePage = queryPage ? Number(queryPage) : 1;
  const safePerPage = queryPerPage ? Number(queryPerPage) : 12;
  const safeCategory = useMemo(() => {
    if (Array.isArray(queryCategory)) {
      return queryCategory;
    } else if (queryCategory) {
      return [queryCategory];
    }

    return [];
  }, [queryCategory]);

  return {
    querySearchTerm,
    safePage,
    safePerPage,
    queryStatus,
    safeCategory,
  };
};
