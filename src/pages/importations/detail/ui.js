import React from "react";
import { Link } from "react-router-dom";
import BreadCrumbs from "../../../shared/breadCrumbs";
import Loader from "../../../shared/loader";
import Messages from "../../../shared/messages";
import { Table } from "react-bootstrap";

export default ({importation, loading }) => {
  if (loading) return <Loader />;
  return (
    <React.Fragment>
      <BreadCrumbs />
      <Messages />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Properties</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(importation).map((entry) => {
            return (
              <tr>
                {entry.map((nestedEntry) => {
                  return <td>{nestedEntry}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to="/importations" className="btn btn-danger mt-3">
        Go Back
      </Link>
    </React.Fragment>
  );
};
