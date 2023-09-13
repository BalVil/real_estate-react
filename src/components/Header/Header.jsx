import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import "./Header.css";

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 767) {
      return { right: !menuOpened && "-100%" };
    }
  };
  return (
    <section className="header-wrapper">
      <div className="flexCenter paddings innerWidth header-container">
        <div className="logo-wrap">
          <img src="./img/logo.png" alt="logo" width={100} />
        </div>

        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div
            className="flexCenter header-menu"
            style={getMenuStyles(menuOpened)}
          >
            <a href="">Residencies</a>
            <a href="">Our Value</a>
            <a href="">Contact Us</a>
            <a href="">Get Started</a>
            <button className="button">
              <a href="">Contact</a>
            </button>
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
