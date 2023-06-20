import React from "react";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="footer">
        <h4>Phone: 646-316-4371</h4>
        <h4>Email:animemerch@anime.com</h4>
      </div>
    </>
  );
};

export default Footer;
