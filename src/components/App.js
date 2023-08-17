import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import SavedNews from "./SavedNews";
import PopupMessage from "./PopupMessage";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "./../utils/Api";
import { userList, savedNews } from "./../utils/constant";

function App(props) {
  const [theme, setTheme] = React.useState("light");
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPopupMessageOpen, setIsPopupMessageOpen] = React.useState(false);
  const [popupMessage, setIsPopupMessage] = React.useState("");
  const [savedNewsList, setSavedNewsList] = React.useState(savedNews);

  function changeTheme(newTheme) {
    setTheme(newTheme);
  }

  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setIsPopupMessageOpen(false);
  }

  function handleLoginClick() {
    setLoginPopupOpen(true);
  }

  function handleRegisterClick() {
    setRegisterPopupOpen(true);
  }

  function handleLogin({ email, password }) {
    const user = userList.find(
      (element) => element.email === email && element.password === password
    );
    if (user) {
      setCurrentUser({
        name: user.name,
        email: user.email,
      });
      setIsLoggedIn(true);
      closeAllPopups();
      props.history.push("/");
    } else {
      closeAllPopups();
      setIsPopupMessageOpen(true);
      setIsPopupMessage("Invalid Login");
    }
  }

  function handleLogout() {
    setCurrentUser({});
    setIsLoggedIn(false);
    props.history.push("/");
  }

  function handleRegister({ email, username, password }) {
    const user = userList.find((element) => element.email === email);
    if (user) {
      setIsPopupMessageOpen(true);
      setIsPopupMessage("Invalid Registration");
    } else {
      userList.push({ email: email, name: username, password: password });
      closeAllPopups();
      setIsPopupMessageOpen(true);
      setIsPopupMessage("Registration successfully completed!");
    }
  }

  function handleSaveArticle({
    image,
    publishedAt,
    title,
    description,
    source,
  }) {
    savedNewsList.push({
      image: image,
      publishedAt: publishedAt,
      title: title,
      description: description,
      source: source,
    });
  }

  function handleDeleteSavedArticle(title) {
    const index = savedNewsList.findIndex((element) => element.title === title);
    setSavedNewsList(savedNewsList.toSpliced(index, 1));
  }

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
                  savedNewsList={savedNewsList}
                  handleDeleteSavedArticle={handleDeleteSavedArticle}
                />
              ) : (
                <Redirect to="/" />
              )}{" "}
            </Route>{" "}
            <Route path="/">
              <Main
                onChangeTheme={changeTheme}
                api={api}
                handleSaveArticle={handleSaveArticle}
              />{" "}
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
          <PopupMessage
            name="messagePopup"
            isOpen={isPopupMessageOpen}
            onClose={closeAllPopups}
            message={popupMessage}
            onLoginClick={handleLoginClick}
          />
        </CurrentUserContext.Provider>{" "}
      </ThemeContext.Provider>{" "}
    </div>
  );
}

export default withRouter(App);
