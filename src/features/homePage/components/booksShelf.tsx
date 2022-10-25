import { Book, ShelfType } from "../../../helper/BooksAPIData";
import BookComponent from "./bookComponent";

interface BooksShelfProps {
  books: Book[];
  updateBookShelf?: (book: Book, type: ShelfType) => void;
}

const BooksShelf = (props: BooksShelfProps): JSX.Element => {
  const { books, updateBookShelf } = props;

  const renderGridBooks = (): JSX.Element => {
    return (
      <div className="bookshelf-books">
        {books && (
          <ol className="books-grid">
            {books.map((book) => (
              <BookComponent
                key={book.id}
                book={book}
                updateBookShelf={updateBookShelf}
              />
            ))}
          </ol>
        )}
      </div>
    );
  };

  return <div className="bookshelf-books">{renderGridBooks()}</div>;
};

export default BooksShelf;
