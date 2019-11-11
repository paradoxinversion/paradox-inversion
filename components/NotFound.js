import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Yikes...</h1>
        </header>
        <p>
          The page you're looking for doesn't exist. You can try going back or{" "}
          <Link to="/">clicking here to go home.</Link>
        </p>
      </div>
    );
  }
}

export default NotFound;
