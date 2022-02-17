import React from "react";
import { Link } from "react-router-dom";

const Button = ({ nameButton, link, onClick }) => {
  return (
    <Link
      to={{
        pathname: link,
      }}
      className='main-block__button'
      onClick={onClick}
    >
      {nameButton}
    </Link>
  );
};

export default Button;
