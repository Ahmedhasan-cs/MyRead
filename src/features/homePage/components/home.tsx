import { useEffect, useState } from "react";
import "../styles/home.css";
import { getAll, update } from "../../../helper/BooksAPI";
import {
  Book,
  getBooksByShelf,
  ShelfType,
  Shelves,
} from "../../../helper/BooksAPIData";
import BooksShelf from "./booksShelf";
import { useNavigate } from "react-router-dom";

interface BooksProps {
  books: Book[];
  updateBookShelf: (book: Book, type: ShelfType) => void;
}

const HomePage = (props: BooksProps): JSX.Element => {
  const { books, updateBookShelf } = props;
  let booksShelf = getBooksByShelf(books ?? []);
  let navigate = useNavigate();

  const openSearch = (): void => {
    navigate("/search");
  };

  const renderSearchIcon = (): JSX.Element => {
    return (
      <div className="open-search">
        <a onClick={() => openSearch()}>Add a book</a>
      </div>
    );
  };

  const getShelfTitle = (shelfType: ShelfType): string => {
    switch (shelfType) {
      case ShelfType.CurrentlyReading:
        return "Currently Reading";
      case ShelfType.WantToRead:
        return "Want to Read";
      case ShelfType.Read:
        return "Read";
      default:
        return "";
    }
  };

  const renderbookshelf = (shelfType: ShelfType): JSX.Element => {
    if (!books) {
      return <></>;
    }
    return (
      <div key={shelfType}>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{getShelfTitle(shelfType)}</h2>
          <BooksShelf
            books={booksShelf[shelfType]}
            updateBookShelf={updateBookShelf}
          />
        </div>
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    if (!books) {
      return <></>;
    }
    return <div>{Shelves.map((shelfType) => renderbookshelf(shelfType))}</div>;
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {renderSearchIcon()}
        {books && renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
