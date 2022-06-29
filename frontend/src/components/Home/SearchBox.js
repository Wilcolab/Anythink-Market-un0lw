import { useState, useEffect } from "react";
import { SET_PAGE } from "../../constants/actionTypes";
import { connect } from "react-redux";
import agent from "../../agent";

const MIN_SEARCH_LENGTH = 3;

const mapDispatchToProps = (dispatch) => ({
  onSearch: (searchInput) =>
    dispatch({
      type: SET_PAGE,
      tab: "all",
      pager: agent.Items.all,
      payload: agent.Items.all(undefined, searchInput),
    }),
});

const SearchBox = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput.trim().length >= MIN_SEARCH_LENGTH) {
      onSearch(searchInput);
    }
  }, [searchInput, onSearch]);

  return (
    <div className="p-2 d-inline mx-2 bg-white w-100" id="search-box">
      <input
        className="rounded-lg border-0"
        id="search-box"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="What is it that you truly desire?"
      />
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(SearchBox);
