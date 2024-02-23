import React from "react";
import "../Header/Header.css";

const Header = (props) => {
  const { pageTitle, actionItems } = props;
  return (
    <div className="flex flex-row justify-content-between align-items-center mb-3 ml-3">
      <div className="page-heading text-800 font-bold mt-3">{pageTitle}</div>
      <div className="actionitem flex mt-3 mr-3">{actionItems}</div>
    </div>
  );
};

export default Header;
