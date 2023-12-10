import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { useDisclosure } from "@mantine/hooks";
import { getMenuStyles } from "../../utils/common";
import useAuthCheck from "../../hooks/useAuthCheck";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import "./Header.css";

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [disableBodyClick, setDisableBodyClick] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleOutsideClick = () => {
    if (menuOpened) {
      setMenuOpened(false);
      setDisableBodyClick(false);
    }
  };

  useEffect(() => {
    if (disableBodyClick) {
      document.body.classList.add("disable-body-click");
    } else {
      document.body.classList.remove("disable-body-click");
    }
  }, [disableBodyClick]);

  return (
    <section className="header-wrapper">
      <div className="flexCenter paddings innerWidth header-container">
        <Link to="/">
          <div className="logo-wrap__header">
            <img src="/img/logo.svg" alt="logo" width={100} />
          </div>
        </Link>

        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div
            className={`flexCenter header-menu ${
              menuOpened && "active-pointer"
            }`}
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>
            <a href="#contact">Contact</a>

            <div
              onClick={() => {
                validateLogin() && open();
              }}
            >
              Add property
            </div>
            <AddPropertyModal opened={opened} onClose={close} />

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
          onClick={() => {
            setMenuOpened(!menuOpened);
            setDisableBodyClick(!menuOpened);
          }}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}

export default Header;
