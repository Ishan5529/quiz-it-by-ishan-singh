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
  let safeCategory = [];
  if (Array.isArray(queryCategory)) {
    safeCategory = queryCategory;
  } else if (queryCategory) {
    safeCategory = [queryCategory];
  }

  return {
    querySearchTerm,
    safePage,
    safePerPage,
    queryStatus,
    safeCategory,
  };
};
