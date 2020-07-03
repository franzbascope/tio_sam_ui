import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export default () => {
  const [path, setPath] = useState([]);
  useEffect(() => {
    let url = window.location.pathname;
    let addressArray = url.split("/");

    setPath(addressArray);
  }, []);

  return (
    <Breadcrumb>
      {path.map((path, key) => {
        return (
          <li key={key} className="breadcrumb-item">
            <Link to={path} role="buttons">
              {path.toUpperCase()}
            </Link>
          </li>
        );
      })}
    </Breadcrumb>
  );
};
