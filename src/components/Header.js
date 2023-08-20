import React from "react";
import Navigation from "./Navigation";
import { ThemeContext } from "../contexts/ThemeContext";
import { withRouter } from "react-router-dom";
import menu_dark from "../images/menu-dark.svg";
import menu_light from "../images/menu-light.svg";

function Header(props) {
  const theme = React.useContext(ThemeContext);
  const [isMenuButtonShown, setIsMenuButtonShown] = React.useState(true);
  const [isMenuShown, setIsMenuShown] = React.useState(false);

  function handleShowMenu() {
    setIsMenuButtonShown(false);
    setIsMenuShown(true);
  }

  function handleHideMenu() {
    setIsMenuButtonShown(true);
    setIsMenuShown(false);
  }

  return (
    <header
      className={`header header_theme_${theme} ${
        isMenuShown ? "header_nav-menu_active" : ""
      }`}
    >
      <div className="header__wrapper">
        <h2
          className={`logo ${
            isMenuShown ? "logo_theme_light" : `logo_theme_${theme}`
          }`}
        >
          {" "}
          News Explorer{" "}
        </h2>{" "}
        <button
          type="button"
          className={`header__menu-button ${
            isMenuButtonShown ? "header__menu-button_visibility" : ""
          }`}
          onClick={handleShowMenu}
        >
          <img
            src={theme === "light" ? menu_light : menu_dark}
            alt="menu icon"
          />{" "}
        </button>{" "}
        <Navigation
          isLoggedIn={props.isLoggedIn}
          onLoginClick={props.onLoginClick}
          onLogoutClick={props.handleLogout}
          isMenuButtonShown={isMenuButtonShown}
          handleShowMenu={handleShowMenu}
          isMenuShown={isMenuShown}
          handleHideMenu={handleHideMenu}
        />{" "}
      </div>{" "}
    </header>
  );
}

export default withRouter(Header);
