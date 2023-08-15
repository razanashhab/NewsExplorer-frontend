import React from "react";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCard from "./NewsCard";
import { withRouter } from "react-router-dom";

function SavedNews(props) {
  let savedNews = [];
  if (localStorage.getItem("savedArticles")) {
    savedNews = JSON.parse(localStorage.getItem("savedArticles"));
  }

  React.useEffect(() => {
    props.onChangeTheme("dark");
  }, []);

  return (
    <section className="savedNews">
      <SavedNewsHeader savedNewsCount={savedNews.length} />{" "}
      <div
        className={`cardList ${savedNews.length <= 0 ? "cardList_hidden" : ""}`}
      >
        <div className="cardList__container cardList__container_position">
          {" "}
          {savedNews.length > 0 &&
            savedNews.map((news) => (
              <NewsCard
                publishedAt={news.publishedAt}
                title={news.title}
                description={news.description}
                source={news.source}
                image={news.image}
                isSavedNews={true}
              />
            ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}

export default withRouter(SavedNews);
