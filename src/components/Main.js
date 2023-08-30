import React from "react";
import SearchForm from "./SearchForm";
import About from "./About";
import NewsCardList from "./NewsCardList";
import Preloader from "./Preloader";
import InfoTooltip from "./InfoTooltip";

function Main(props) {
  React.useEffect(() => {
    props.onChangeTheme("light");
  });

  React.useEffect(() => {
    props.handleSearchedNewsDisplay();
  }, []);

  function getArticlesList(query) {
    props.searchArticles(query);
  }

  return (
    <main className="main">
      <SearchForm
        getArticlesList={getArticlesList}
        setKeyword={props.setKeyword}
      />{" "}
      {props.showPreloader && <Preloader showPreloader={props.showPreloader} />}{" "}
      {props.showCardList && (
        <NewsCardList
          articles={props.articles}
          showCardList={props.showCardList}
          handleSaveArticle={props.handleSaveArticle}
          keyword={props.keyword}
          onLoginClick={props.onLoginClick}
        />
      )}{" "}
      {props.showinfoTooltip && (
        <InfoTooltip showinfoTooltip={props.showinfoTooltip} />
      )}{" "}
      <About />
    </main>
  );
}

export default Main;
