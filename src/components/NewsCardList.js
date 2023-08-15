import React from "react";
import NewsCard from "./NewsCard";

function NewsCardList(props) {
  const [count, setCount] = React.useState(3);

  const increment = () => {
    setCount((c) => c + 3);
  };
  return (
    <section
      className={`cardList ${!props.showCardList ? "cardList_hidden" : ""}`}
    >
      {" "}
      <div className="cardList__wrapper">
        <h2 className="cardList__title"> Search Result </h2>{" "}
        <div className="cardList__container">
          {" "}
          {props.articles.slice(0, count) &&
            props.articles
              .slice(0, count)
              .map((article) => (
                <NewsCard
                  publishedAt={article.publishedAt}
                  title={article.title}
                  description={article.description}
                  source={article.source.name}
                  image={article.urlToImage}
                  isSavedNews={false}
                />
              ))}{" "}
        </div>{" "}
      </div>{" "}
      <button className="cardList__button" onClick={increment}>
        {" "}
        Show more{" "}
      </button>{" "}
    </section>
  );
}

export default NewsCardList;
