import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Footer = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.me.isAdmin)
  return (
    <>
      <div className="footer">
      {isAdmin && <h3>You are an admin user.</h3>}
      {!isAdmin && <h3>You are not an admin user.</h3>}
        <h4>Phone: 646-316-4371</h4>
        <h4>Email:animemerch@anime.com</h4>
      </div>
    </>
  );
};

export default Footer;
