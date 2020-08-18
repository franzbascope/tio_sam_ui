import React, { useGlobal, useEffect } from "reactn";
import { Pagination } from "react-bootstrap";

export default ({fetchData}) => {
  const [globalValues, setGlobalValues] = useGlobal();
  let active = globalValues.currentPage;
  let items = [];
  
  for (let number = 1; number <= globalValues.totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() =>{
            setGlobalValues({currentPage: number});
            fetchData(number, globalValues.query);
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
