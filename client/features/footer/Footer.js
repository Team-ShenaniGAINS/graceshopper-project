import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="footer">
        <ul>
          <li>Phone: 646-316-4371</li>
          <li>Email:animemerch@anime.com</li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
