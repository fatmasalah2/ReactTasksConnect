import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UsePaginationOptions = {
  initialPage: number;
  totalPages: number;
  useRouting?: boolean;
  routeMap?: Record<number, string>;
};

const usePagination = ({
  // lvalues li hyshtghl beha lhook
  initialPage,
  totalPages,
  useRouting = false,
  routeMap = {},
}: UsePaginationOptions) => {
  const [page, setPage] = useState(initialPage);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // lma adus 3la buttons lpagination 
    setPage(value);
    if (useRouting && routeMap[value]) {
      navigate(routeMap[value]);
    }
  };

  return { page, totalPages, handleChange };
};

export default usePagination;
