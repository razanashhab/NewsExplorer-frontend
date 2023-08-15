import React from "react";

function SearchForm(props) {
  const [search, setSearch] = React.useState("");

  function handleSearchChange(evt) {
    setSearch(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.getArticlesList(search);
  }

  return (
    <section className="searchForm">
      <h1 className="searchForm__title"> What 's going on in the World?</h1>{" "}
      <p className="searchForm__description">
        Find the latest news on any topic and save them in your personal
        account.{" "}
      </p>{" "}
      <form className="searchForm__form" onSubmit={handleSubmit}>
        <fieldset className="searchForm__fieldset">
          <input
            type="text"
            className="searchForm__input"
            placeholder="Enter topic"
            onChange={handleSearchChange}
            value={search}
          />{" "}
          <button type="submit" className="searchForm__submit">
            Search{" "}
          </button>{" "}
        </fieldset>{" "}
      </form>{" "}
    </section>
  );
}

export default SearchForm;
