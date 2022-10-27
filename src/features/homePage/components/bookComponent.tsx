import { Book, ShelfType } from "../../../helper/BooksAPIData";

interface BookProps {
  book: Book;
  updateBookShelf?: (book: Book, type: ShelfType) => void;
}

const BookComponent = (props: BookProps): JSX.Element => {
  const { book, updateBookShelf } = props;

  const bookShelfOnSelect = (value: string): void => {
    if (updateBookShelf) {
      updateBookShelf(book, value as ShelfType);
    }
  };

  const bookOptionsList = (): JSX.Element => {
    return (
      <div className="book-shelf-changer">
        <select
          value={book.shelf ?? ShelfType.None}
          onChange={(event) => bookShelfOnSelect(event.target.value)}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="noShelf">None</option>
        </select>
      </div>
    );
  };

  const thumb =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : undefined;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: thumb ? `url(${thumb})` : undefined,
            }}
          ></div>
          {bookOptionsList()}
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors : ""}</div>
      </div>
    </li>
  );
};

export default BookComponent;
