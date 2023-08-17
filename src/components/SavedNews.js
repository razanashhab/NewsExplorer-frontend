import React from "react";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCard from "./NewsCard";
import { withRouter } from "react-router-dom";

function SavedNews(props) {
  React.useEffect(() => {
    props.onChangeTheme("dark");
  });

  return (
    <section className="savedNews">
      <SavedNewsHeader savedNewsCount={props.savedNewsList.length} />{" "}
      <div
        className={`cardList ${
          props.savedNewsList.length <= 0 ? "cardList_hidden" : ""
        }`}
      >
        <div className="cardList__container cardList__container_position">
          {" "}
          {props.savedNewsList.length > 0 &&
            props.savedNewsList.map((news, i) => (
              <NewsCard
                key={i}
                publishedAt={news.publishedAt}
                title={news.title}
                description={news.description}
                source={news.source}
                image={news.image}
                isSavedNews={true}
                handleDeleteSavedArticle={props.handleDeleteSavedArticle}
              />
            ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}

export default withRouter(SavedNews);
