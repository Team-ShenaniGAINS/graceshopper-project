import React from "react";

// import { useSelector } from "react-redux";

// import { Link } from "react-router-dom";

//NOTE: only need useSelector when we have STATE management needs (backend?)

// and link when we have ROUTES (backend?)

const TrueNavbar = () => {
  const logoUrl =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.animerch.cz%2Fplacky-sword-art-online%2Fplacka-sinon-50-mm%2F&psig=AOvVaw1tLRoK5_8RXijI-P6yBf5A&ust=1686758932293000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPi34-nQwP8CFQAAAAAdAAAAABAE";

  return (
    <div id="trueNavbar">
      <img src={logoUrl} alt="Logo" />

      <form id="searchBar">
        <label>Search Animerch</label>
      </form>

      <button>Cart</button>
    </div>
  );
};

export default TrueNavbar;
