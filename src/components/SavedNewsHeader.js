import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [keywordCount, setKeywordCount] = React.useState(0);
  const [maximumIndex, setMaximumIndex] = React.useState(0);
  const [sortedKeyword, setSortedKeyword] = React.useState([]);

  React.useEffect(() => {
    handleKeywordList();
  }, [props.savedNewsList]);

  function handleKeywordList() {
    const groupByKeywords = props.savedNewsList.reduce((group, news) => {
      const { keyword } = news;
      group[keyword] = group[keyword] ?? [];
      group[keyword].push(news);
      //group[keyword].count = group[keyword].length;
      return group;
    }, {});

    setSortedKeyword(
      Object.values(groupByKeywords).sort((first, second) => {
        if (first.length < second.length) return 1;
        if (first.length > second.length) return -1;
        return 0;
      })
    );

    if (sortedKeyword.length <= 3) {
      setKeywordCount(0);
      setMaximumIndex(3);
    } else {
      setKeywordCount(sortedKeyword.length - 2);
      setMaximumIndex(2);
    }
  }

  return (
    <div className="savednewsheader">
      <h3 className="savednewsheader__subtitle"> Saved articles </h3>{" "}
      <h1 className="savednewsheader__title">
        {`${currentUser.name}, you have ${props.savedNewsCount} saved articles`}
      </h1>{" "}
      <p className="savednewsheader__paragraph">
        {" "}
        By keywords:{" "}
        <span className="savednewsheader__span">
          {sortedKeyword.map((itm, i) => {
            if (i < maximumIndex) return ` ${itm.at(0).keyword}, `;
            else if (i === maximumIndex) {
              return `and ${keywordCount} other`;
            }
          })}
        </span>
      </p>{" "}
    </div>
  );
}

export default SavedNewsHeader;
