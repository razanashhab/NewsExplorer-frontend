import React from "react";
import logout_dark from "../images/logout.svg";
import logout_light from "../images/logout-light.svg";
import { ThemeContext } from "../contexts/ThemeContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  const theme = React.useContext(ThemeContext);
  const currentUser = React.useContext(CurrentUserContext);
  const [isHomePage, setIsHomePage] = React.useState(true);
  const [isSavedNewsPage, setIsSavedNewsPage] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    currentUser.email != null ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [currentUser]);

  function onHomeClick() {
    props.handleHideMenu();
    setIsHomePage(true);
    setIsSavedNewsPage(false);
  }

  function onSaveNewsClick() {
    props.handleHideMenu();
    setIsSavedNewsPage(true);
    setIsHomePage(false);
  }

  function handleLoginClick() {
    props.handleHideMenu();
    props.onLoginClick();
  }

  function handleLogoutClick() {
    props.handleHideMenu();
    props.onLogoutClick();
  }

  return (
    <nav className={`nav ${props.isMenuShown ? "nav_opened" : ""}`}>
      <div className="nav__wrapper">
        <ul className="nav__items  nav__items_align_right">
          <li
            className={`nav__item nav__item_align_left nav__item_theme_${theme} ${
              isHomePage ? `nav__item_active-${theme}` : ""
            }`}
          >
            <Link to="/" className={`nav__link`} onClick={onHomeClick}>
              {" "}
              Home{" "}
            </Link>{" "}
          </li>{" "}
          <li
            className={`nav__item nav__item_align_left nav__item_theme_${theme} ${
              isLoggedIn || "nav__hide"
            } ${isSavedNewsPage ? `nav__item_active-${theme}` : ""}`}
          >
            <Link
              to="/saved-news"
              className={`nav__link`}
              onClick={onSaveNewsClick}
            >
              {" "}
              Saved Articles{" "}
            </Link>{" "}
          </li>{" "}
        </ul>{" "}
        <ul className="nav__items">
          <li className={`nav__item ${!isLoggedIn || "nav__hide"}`}>
            <button
              type="button"
              className={`nav__button nav__button_theme_${theme}  nav__link_theme_${theme} `}
              onClick={handleLoginClick}
            >
              Sign in
            </button>{" "}
          </li>{" "}
          <li className={`nav__item ${isLoggedIn || "nav__hide"}`}>
            <button
              type="button"
              className={`nav__button nav__button_theme_${theme}   nav__link_theme_${theme}`}
              onClick={handleLogoutClick}
            >
              <div className="nav__button-container">
                <span>{currentUser.name}</span>{" "}
                <img
                  src={
                    props.isMenuShown
                      ? logout_light
                      : theme === "light"
                      ? logout_light
                      : logout_dark
                  }
                  alt="logout icon"
                />
              </div>
            </button>{" "}
          </li>{" "}
        </ul>{" "}
      </div>
    </nav>
  );
}

export default withRouter(Navigation);
