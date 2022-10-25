import { Book, ShelfType } from "../../../helper/BooksAPIData";
import { useCallback, useEffect, useState } from "react";
import "../styles/home.css";
import debounce from "lodash/debounce";
import { search } from "../../../helper/BooksAPI";
import BooksShelf from "./booksShelf";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  books: Book[];
  updateBookShelf: (book: Book, type: ShelfType) => void;
}

const Search = (props: SearchProps): JSX.Element => {
  const { books, updateBookShelf } = props;
  const [booksResult, setBooksResult] = useState(
    undefined as undefined | Book[]
  );
  const [searchInput, setSearchInput] = useState(
    undefined as undefined | string
  );
  const debouncedSetSearch = useCallback(debounce(setSearchInput, 500), []);
  let navigate = useNavigate();

  const handleSearchChange = (text: string): void => {
    const enteredSearchInput = text;
    debouncedSetSearch(enteredSearchInput);
    if (enteredSearchInput.length === 0) {
      setBooksResult([]);
    }
  };

  useEffect(() => {
    const getAllBooks = async (): Promise<void> => {
      const response = await search(searchInput);
      if (response && !response.error) {
        let booksOutput = response as Book[];
        booksOutput = booksOutput.map(
          (obj) => books.find((o) => o.id === obj.id) || obj
        );
        setBooksResult(booksOutput);
      } else {
        setBooksResult([]);
      }
    };
    if (searchInput) {
      getAllBooks();
    }
  }, [searchInput]);

  const back = (): void => {
    navigate("/");
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={back}>
            Close
          </a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={(event) => handleSearchChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksShelf
            books={booksResult ?? []}
            updateBookShelf={updateBookShelf}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
