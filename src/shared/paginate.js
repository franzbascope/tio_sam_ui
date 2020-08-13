import React, { useGlobal, useEffect } from "reactn";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

export default () => {
  const [globalValues, setGlobalValues] = useGlobal();
  //setGlobalValues({ ...globalValues, totalPage: 5, currentPage: 1 });
  useEffect(() => {
    setGlobalValues({ ...globalValues, totalPage: 5, currentPage: 3 });
  }, []);
  let active = globalValues.currentPage;
  let items = [];
  for (let number = 1; number <= globalValues.totalPage; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setGlobalValues({ ...globalValues, currentPage: number });
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
};
