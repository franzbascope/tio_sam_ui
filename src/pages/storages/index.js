import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../shared/breadCrumbs";
import { useGlobal } from "reactn";
import Messages from "../../shared/messages";
import Loader from "../../shared/loader";
import Table from './table';
import mainHandler from "../../shared/requestHandler";
import { storagesUrl } from "../../shared/urls";
import * as Methods from "../../shared/methods";

export default () => {

  const [inputValues, setValues] = useState({
    storages: [],
  });
  const [globalValues] = useGlobal();
  const requestHandler = mainHandler();

  useEffect(() => {
    async function fetchProducts() {
      let res = await requestHandler(Methods.GET, storagesUrl);
      if (res) setValues({ ...inputValues, storages: res.data });
    }
    fetchProducts();
  }, []);
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      {globalValues.loading ?
        <Loader /> : 
        <Table 
          storages={inputValues.storages} 
          deleteStorages={(id) => { 
            
          }}
          editStorages={(id) =>{
            
          }}
        />}
    </React.Fragment>
  );
};
