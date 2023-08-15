import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import SavedNews from "./SavedNews";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "./../utils/Api";

function App(props) {
  const [theme, setTheme] = React.useState("light");
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function changeTheme(newTheme) {
    setTheme(newTheme);
  }

  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
  }

  function handleLoginClick() {
    setLoginPopupOpen(true);
  }

  function handleRegisterClick() {
    setRegisterPopupOpen(true);
  }

  function handleLogin() {
    setCurrentUser({
      name: "Razan",
      email: "razan.ashhab@gmail.com",
    });
    setIsLoggedIn(true);
    closeAllPopups();
    props.history.push("/");
  }

  function handleLogout() {
    setCurrentUser({});
    setIsLoggedIn(false);
    props.history.push("/");
  }

  function handleRegister() {}

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <div className="page">
      <ThemeContext.Provider value={theme}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            onLoginClick={handleLoginClick}
            onSignup={handleRegisterClick}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />{" "}
          <Switch>
            <Route path="/saved-news">
              {" "}
              {isLoggedIn ? (
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  onChangeTheme={changeTheme}
                />
              ) : (
                <Redirect to="/" />
              )}{" "}
            </Route>{" "}
            <Route path="/">
              <Main onChangeTheme={changeTheme} api={api} />{" "}
            </Route>{" "}
          </Switch>{" "}
          <Footer />
          <Login
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
            handleLogin={handleLogin}
            onChangeTheme={changeTheme}
            onSignup={handleRegisterClick}
          />{" "}
          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            handleRegister={handleRegister}
            onLoginClick={handleLoginClick}
          />{" "}
        </CurrentUserContext.Provider>{" "}
      </ThemeContext.Provider>{" "}
    </div>
  );
}

export default withRouter(App);
