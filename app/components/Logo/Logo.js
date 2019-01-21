import React from "react";
import { withRouter } from "react-router-dom";
import "./Logo.css";
const Logo = ({ history }) => {
  return (
    <div
      className="logo"
      onClick={() => {
        history.push("/");
      }}>
      <span className="logo__p">Paradox</span>{" "}
      <span className="logo__i">Inversion</span>
    </div>
  );
};

export default withRouter(Logo);
