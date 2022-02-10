import React from "react";
import { Link } from "react-router-dom";

const Button = ({ nameButton, link }) => {
  return (
    <Link
      to={{
        pathname: link,
      }}
      className='main-block__button'
    >
      {nameButton}
    </Link>
  );
};

export default Button;
