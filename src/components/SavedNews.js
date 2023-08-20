import React from "react";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCard from "./NewsCard";
import { withRouter } from "react-router-dom";

function SavedNews(props) {
  React.useEffect(() => {
    props.onChangeTheme("dark");
  });

  return (
    <section className="savednews">
      <SavedNewsHeader savedNewsCount={props.savedNewsList.length} />{" "}
      <div
        className={`cardlist ${
          props.savedNewsList.length <= 0 ? "cardlist_hidden" : ""
        }`}
      >
        <div className="cardlist__container">
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
