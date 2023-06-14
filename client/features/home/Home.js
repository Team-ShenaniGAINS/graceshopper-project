import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Products from "../products/Products";


/**
 * COMPONENT
 */
const Home = (props) => {
	const username = useSelector((state) => state.auth.me.username);

	return (
		<>
			<div className="home-title">
				<h1>Welcome to Animerch, {username}!</h1>
				<h3>
					Browse our selection of extravagant selection of new and classic
					relics!
				</h3>
			</div>
			<div className="about-container">
				<h2 className="about-title">
					Introducing Animerch: Your Anime Merchandise Paradise
				</h2>
				<p className="about-paragraph">
					Welcome to Animerch, your one-stop shop for all things anime
					merchandise. Discover a world of captivating collectibles, stylish
					apparel, and accessories that showcase your favorite characters and
					series. At Animerch, we understand the deep connection and enthusiasm
					that anime fans have for their beloved shows. That's why we've curated
					an extensive selection of official, high-quality products to cater to
					your every need. From eye-catching figurines and plushies to trendy
					apparel and accessories, Animerch is the ultimate destination for
					anime enthusiasts to express their passion and bring their favorite
					series to life. Step into our virtual store and immerse yourself in a
					world where the vibrant colors and iconic characters of anime can be a
					part of your everyday life. Join the Animerch community and explore
					our diverse range of merchandise that spans across genres and
					franchises. We source our products from trusted suppliers, ensuring
					that every item reflects the authenticity and spirit of the anime art
					form. Whether you're a seasoned collector or new to the world of
					anime, Animerch offers an unmatched shopping experience that
					celebrates the captivating stories, breathtaking visuals, and
					cherished moments that make anime truly special. Embrace your love for
					anime and find that perfect piece to complete your collection at
					Animerch, where your anime merchandise dreams become a reality.
				</p>
			</div>
			<div className="home-shop">
				<Link to="/shop" className="homepage-shop">
					<h2>Visit our Shop!</h2>
				</Link>
			</div>
			<div>
				<h1>Products List:</h1>
				<Products />
			</div>
			<div>
				<footer className="homepage-footer">
					<div>hello world </div>
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Home;
