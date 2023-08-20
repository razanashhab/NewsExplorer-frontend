import React from "react";
import NewsCard from "./NewsCard";

function NewsCardList(props) {
  const [count, setCount] = React.useState(3);
  const [showMoreVisibility, setIsShowMoreVisibilty] = React.useState(
    props.articles.length >= 3 ? true : false
  );

  const increment = () => {
    setCount((c) => {
      return c + 3 > props.articles.length
        ? props.articles.length && setIsShowMoreVisibilty(false)
        : c + 3;
    });
    console.log(`total length is : ${props.articles.length}`);
  };

  return (
    <section
      className={`cardlist ${!props.showCardList ? "cardlist_hidden" : ""}`}
    >
      <h2 className="cardlist__title"> Search Result </h2>{" "}
      <div className="cardlist__container">
        {" "}
        {props.articles.slice(0, count) &&
          props.articles
            .slice(0, count)
            .map((article, i) => (
              <NewsCard
                key={i}
                publishedAt={article.publishedAt}
                title={article.title}
                description={article.description}
                source={article.source.name}
                image={article.urlToImage}
                isSavedNews={false}
                handleSaveArticle={props.handleSaveArticle}
              />
            ))}{" "}
      </div>{" "}
      {showMoreVisibility && (
        <button className="cardlist__button" onClick={increment}>
          Show more{" "}
        </button>
      )}{" "}
    </section>
  );
}

export default NewsCardList;
