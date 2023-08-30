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
      <SavedNewsHeader
        savedNewsCount={props.savedNewsList ? props.savedNewsList.length : 0}
        savedNewsList={props.savedNewsList}
      />{" "}
      <div
        className={`cardlist ${!props.savedNewsList ? "cardlist_hidden" : ""}`}
      >
        <div className="cardlist__container">
          {" "}
          {props.savedNewsList &&
            props.savedNewsList.map((news, i) => {
              return (
                <NewsCard
                  key={i}
                  id={news._id}
                  publishedAt={news.publishedAt}
                  title={news.title}
                  description={news.description}
                  source={news.source}
                  image={news.image}
                  keyword={news.keyword}
                  isSavedNews={true}
                  handleDeleteSavedArticle={props.handleDeleteSavedArticle}
                />
              );
            })}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}

export default SavedNews;
