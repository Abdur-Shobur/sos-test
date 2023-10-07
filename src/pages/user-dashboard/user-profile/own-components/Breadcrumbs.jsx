import React from "react";
import { Link } from "react-router-dom";

function Breadcrumbs() {
  return (
    <div className="breadcrumb-wrapper breadcrumb-contacts">
      <div>
        <h1>User Profile</h1>
        <p className="breadcrumbs">
          <span>
            <Link to="/">Home</Link>
          </span>
          <span>
            <i className="mdi mdi-chevron-right"></i>
          </span>
          Profile
        </p>
      </div>
    </div>
  );
}

export default Breadcrumbs;
