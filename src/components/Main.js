import React from "react";
import SearchForm from "./SearchForm";
import About from "./About";
import NewsCardList from "./NewsCardList";
import { withRouter } from "react-router-dom";
import Preloader from "./Preloader";
import InfoTooltip from "./InfoTooltip";

function Main(props) {
  React.useEffect(() => {
    props.onChangeTheme("light");
  }, []);

  const [showCardList, setShowCardList] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [showinfoTooltip, setShowinfoTooltip] = React.useState(false);
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    handleSearchedNewsDisplay();
  }, []);

  function handleSearchedNewsDisplay() {
    const searchedNews = localStorage.getItem("searchedNews");
    if (searchedNews && searchedNews.length > 0) {
      setArticles(JSON.parse(searchedNews));
      setShowCardList(true);
    }
  }

  function getArticlesList(query) {
    setArticles([]);
    setShowPreloader(true);
    setShowinfoTooltip(false);
    props.api
      .getArticles(query)
      .then((data) => {
        if (data && data.articles.length > 0) {
          setArticles(data.articles);
          localStorage.setItem("searchedNews", JSON.stringify(data.articles));
          setShowCardList(true);
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
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  return (
    <main className="main">
      <SearchForm getArticlesList={getArticlesList} />{" "}
      {showPreloader && <Preloader showPreloader={showPreloader} />}{" "}
      {showCardList && (
        <NewsCardList
          articles={articles}
          showCardList={showCardList}
          handleSaveArticle={props.handleSaveArticle}
        />
      )}{" "}
      {showinfoTooltip && <InfoTooltip showinfoTooltip={showinfoTooltip} />}{" "}
      <About />
    </main>
  );
}

export default withRouter(Main);
