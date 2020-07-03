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
      {path.map((url, key) => {
        if (url != "") {
          let redirectUrl = `/${url}`;
          if (key > 1) {
            redirectUrl = `/${path[key - 1]}/${url}`;
          }

          return (
            <li key={key} className="breadcrumb-item">
              <Link to={redirectUrl} role="buttons">
                {url.toUpperCase()}
              </Link>
            </li>
          );
        }
      })}
    </Breadcrumb>
  );
};
