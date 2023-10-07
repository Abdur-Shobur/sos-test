import React from "react";
import Search from "../../../../components/formComponent/Search";
import { Link } from "react-router-dom";

function Breadcrumb({ searchHandler, text }) {
  return (
    <div className="breadcrumb-wrapper breadcrumb-contacts">
      <div>
        <h1>{text} Users</h1>
        <p className="breadcrumbs">
          <span>
            <Link to={"/"}>Home</Link>
          </span>
          <span>
            <i className="mdi mdi-chevron-right"></i>
          </span>
          {text} Users
        </p>
      </div>
      <div className="d-flex" style={{ gap: "5px" }}>
        <Search searchHandler={searchHandler} />
      </div>
      <div>
        <Link to={"/admin/add-new-user"} className="btn btn-primary">
          Add User
        </Link>
      </div>
    </div>
  );
}

export default Breadcrumb;
