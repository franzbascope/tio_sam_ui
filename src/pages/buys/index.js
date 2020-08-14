import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../shared/breadCrumbs";
import { Link } from "react-router-dom";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import Loader from "../../shared/loader";
import Table from "./table";
import mainHandler from "../../shared/requestHandler";
import { buysUrl } from "../../shared/urls";
import * as Methods from "../../shared/methods";
import { useHistory } from "react-router-dom";
import Pagination from "../../shared/paginate";

export default () => {
  const [inputValues, setValues] = useState({
    buys: [],
  });
  const [globalValues,setGlobalValues] = useGlobal();
  const requestHandler = mainHandler();
  const history = useHistory();

  const deleteBuys = async (id) => {
    if (window.confirm("Are you sure you want to delete this buy?")) {
      console.log(`Buy id sent ${id}`);
      await requestHandler(
        Methods.DELETE,
        buysUrl,
        null,
        id,
        "Buy deleted successfully"
      );
      let buys = inputValues.buys.filter((buy) => {
        return buy._id != id;
      });
      setValues({
        ...inputValues,
        buys,
      });
    }
  };

  const editBuys = (id) => {
    history.push(`/buys/${id}`);
  };

  const fetchData = async (page, url) =>{
    if (!page) page = 1;
    let res = await requestHandler(Methods.PAGE, url, null, page);
    setGlobalValues({
      ...globalValues,
      totalPages: res.data.totalPages,
      currentPage: page,
    });
    return res;
  }

  const fetchBuys = async (page) =>{
    let res = await fetchData(page, buysUrl);
    if (res) setValues({ ...inputValues, buys: res.data.response });
  }
  useEffect(() => {
    
    fetchBuys();
  }, []);
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Link className="mt-3 mb-3 btn btn-primary" to="/buys/new">
        New Buy
      </Link>
      <Messages />
      {globalValues.loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Table
            buys={inputValues.buys}
            deleteBuys={(id) => {
              deleteBuys(id);
            }}
            editBuys={(id) => {
              editBuys(id);
            }}
          />
          <Pagination fetchData={fetchBuys} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
