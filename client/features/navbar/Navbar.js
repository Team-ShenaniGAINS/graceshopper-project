import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectTotalQuantity } from "../../features/cart/cartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const totalQuantity = useSelector(selectTotalQuantity);
  return (
    <>
      <div>
        <nav className="navbar">
          {isLoggedIn ? (
            <div className="navbar-container">
              {/* The navbar will show these links after you log in */}
              <img
                src="https://cdn.myshoptet.com/usr/www.animerch.cz/user/documents/upload/Loga/2022/Logo%20Animerch%20%20%C4%8Dtverec%20-%20modro%20%C4%8Dern%C3%A1.png"
                className="nav-logo"
              ></img>
              <Link to="/home">Home</Link>
              <Link to="/shop">Shop</Link>

              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
                Cart({totalQuantity})
              </Link>
              <button
                className="logout-btn"
                type="button"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="navbar-container">
              {/* The navbar will show these links before you log in */}
              <img
                src="https://cdn.myshoptet.com/usr/www.animerch.cz/user/documents/upload/Loga/2022/Logo%20Animerch%20%20%C4%8Dtverec%20-%20modro%20%C4%8Dern%C3%A1.png"
                className="nav-logo"
              ></img>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
