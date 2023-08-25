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
    <section className="searchform">
      <h1 className="searchform__title"> What 's going on in the World?</h1>{" "}
      <p className="searchform__description">
        Find the latest news on any topic and save them in your personal
        account.{" "}
      </p>{" "}
      <form className="searchform__form" onSubmit={handleSubmit}>
        <fieldset className="searchform__fieldset">
          <input
            type="text"
            className="searchform__input"
            placeholder="Enter topic"
            onChange={handleSearchChange}
            value={search}
          />{" "}
          <button type="submit" className="searchform__submit">
            Search{" "}
          </button>{" "}
        </fieldset>{" "}
      </form>{" "}
    </section>
  );
}

export default SearchForm;
