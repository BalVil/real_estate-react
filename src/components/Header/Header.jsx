import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./Header.css";

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 767) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="header-wrapper">
      <div className="flexCenter paddings innerWidth header-container">
        <Link to="/">
          <div className="logo-wrap__header">
            <img src="/img/logo.svg" alt="logo" width={100} />
          </div>
        </Link>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div
            className="flexCenter header-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>
            {/* <a href="#residencies">Residencies</a>
            <a href="#value">Our Value</a>
            <a href="#contact">Contact Us</a>
            <a href="#started">Get Started</a> */}
            <a href="#contact">Contact</a>

            {!isAuthenticated ? (
              <button className="button" onClick={() => loginWithRedirect()}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} />
            )}
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}

export default Header;
