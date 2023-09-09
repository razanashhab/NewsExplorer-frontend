import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import SavedNews from "./SavedNews";
import PopupMessage from "./PopupMessage";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  useHistory,
} from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "./../utils/Api";
import mainApi from "./../utils/MainApi";
import ProtectedRoute from "./ProtectedRoute";

function App(props) {
  const [theme, setTheme] = React.useState("light");
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPopupMessageOpen, setIsPopupMessageOpen] = React.useState(false);
  const [popupMessage, setIsPopupMessage] = React.useState("");
  const [savedNewsList, setSavedNewsList] = React.useState([]);
  const [showCardList, setShowCardList] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [showinfoTooltip, setShowinfoTooltip] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  let history = useHistory();

  React.useEffect(() => {
    history.listen((location) => {
      //   console.log(`You changed the page to: ${location.pathname}`);
    });
    handleTokenCheck();
  }, [history]);

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

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // we're checking the user's token
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            loadUserAndArticlesList();
            setIsLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }

  function loadUserAndArticlesList() {
    Promise.all([mainApi.getUserInformation(), mainApi.getArticles()])
      .then(([data, articles]) => {
        //load user info
        setCurrentUser(data.data);
        //load initial cards list
        setSavedNewsList(articles.data);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    mainApi
      .login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          handleTokenCheck();
          closeAllPopups();
        }
      })
      .catch((err) => {
        closeAllPopups();
        setIsPopupMessage("Invalid Login");
      });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    props.history.push("/");
  }

  function handleRegister({ email, username, password }) {
    mainApi
      .register(email, password, username)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setIsPopupMessage("Registration successfully completed!");
        }
      })
      .catch((err) => {
        setIsPopupMessage("Invalid Registration");
      })
      .finally(() => {
        setIsPopupMessageOpen(true);
      });
  }

  function handleSearchedNewsDisplay() {
    const searchedNews = localStorage.getItem("searchedNews");
    const savedKeyword = localStorage.getItem("keyword");
    if (searchedNews && searchedNews.length > 0) {
      setArticles(JSON.parse(searchedNews));
      setShowCardList(true);
    }
    setKeyword(savedKeyword);
  }

  function searchArticles(query) {
    setArticles([]);
    setShowPreloader(true);
    setShowinfoTooltip(false);
    api
      .getArticles(query)
      .then((data) => {
        if (data && data.articles.length > 0) {
          setArticles(data.articles);
          localStorage.setItem("searchedNews", JSON.stringify(data.articles));
          localStorage.setItem("keyword", query);
          setShowCardList(true);
          setKeyword(query);
        } else {
          setShowCardList(false);
          setShowinfoTooltip(true);
          localStorage.removeItem("searchedNews");
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        setShowCardList(false);
        setShowinfoTooltip(true);
        localStorage.removeItem("searchedNews");
        localStorage.removeItem("keyword");
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleSaveArticle(card, handleCardIdChange) {
    mainApi
      .addArticle(
        card.keyword,
        card.title,
        card.text,
        card.date,
        card.source,
        card.link,
        card.image
      )
      .then((newArticle) => {
        setSavedNewsList([newArticle.data, ...savedNewsList]);

        const newArticles = articles.map((currentCard) => {
          if (currentCard.title === newArticle.data.title) {
            return {
              _id: newArticle.data._id,
              publishedAt: newArticle.data.date,
              title: newArticle.data.title,
              description: newArticle.data.text,
              source: { name: newArticle.data.source },
              urlToImage: newArticle.data.image,
              url: newArticle.data.link,
              keyword: keyword,
            };
          }
          return currentCard;
        });
        setArticles(newArticles);
        localStorage.removeItem("searchedNews");
        localStorage.setItem("searchedNews", JSON.stringify(newArticles));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleDeleteSavedArticle(id) {
    mainApi
      .deleteArticle(id)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const newSavedNewsList = savedNewsList.filter(
          (article) => article._id !== id
        );

        setSavedNewsList(newSavedNewsList);

        const newArticles = articles.map((currentCard) => {
          if (currentCard._id === id) {
            console.log("found");
            return {
              publishedAt: currentCard.publishedAt,
              title: currentCard.title,
              description: currentCard.description,
              source: currentCard.source,
              urlToImage: currentCard.urlToImage,
              url: currentCard.url,
              keyword: keyword,
            };
          }
          return currentCard;
        });
        setArticles(newArticles);
        localStorage.removeItem("searchedNews");
        localStorage.setItem("searchedNews", JSON.stringify(newArticles));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
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
      <CurrentUserContext.Provider value={currentUser}>
        <ThemeContext.Provider value={theme}>
          <Header
            onLoginClick={handleLoginClick}
            onSignup={handleRegisterClick}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />{" "}
          <Switch>
            <Route exact path="/">
              <Main
                onChangeTheme={changeTheme}
                handleSearchedNewsDisplay={handleSearchedNewsDisplay}
                searchArticles={searchArticles}
                showCardList={showCardList}
                showinfoTooltip={showinfoTooltip}
                articles={articles}
                showPreloader={showPreloader}
                handleSaveArticle={handleSaveArticle}
                keyword={keyword}
                onLoginClick={handleLoginClick}
                handleDeleteSavedArticle={handleDeleteSavedArticle}
              />{" "}
            </Route>{" "}
            <ProtectedRoute
              path="/saved-news"
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
            >
              <SavedNews
                isLoggedIn={isLoggedIn}
                onLoginClick={handleLoginClick}
                onChangeTheme={changeTheme}
                savedNewsList={savedNewsList}
                handleDeleteSavedArticle={handleDeleteSavedArticle}
              />{" "}
            </ProtectedRoute>{" "}
            <Route path="*"> {<Redirect to="/" />} </Route>{" "}
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
          />{" "}
        </ThemeContext.Provider>{" "}
      </CurrentUserContext.Provider>{" "}
    </div>
  );
}

export default withRouter(App);
