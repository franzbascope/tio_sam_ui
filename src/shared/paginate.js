import React, { useGlobal, useEffect } from "reactn";
import { Pagination } from "react-bootstrap";

export default ({totalPages, fetchData}) => {
  const [globalValues, setGlobalValues] = useGlobal();
  let active = globalValues.currentPage;
  let items = [];

  useEffect(() => {
   //setGlobalValues({ ...globalValues, totalPages: 5, currentPage: 1 });
   
  }, []);
  
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() =>{
            setGlobalValues({currentPage: number});
            fetchData(number);
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
