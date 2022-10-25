import Search from "./features/homePage/components/search";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./features/homePage/components/home";
import { Book, ShelfType } from "./helper/BooksAPIData";
import { getAll, update } from "./helper/BooksAPI";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getAllBooks = async (): Promise<void> => {
      const books: Book[] = await getAll();
      setBooks(books);
    };
    getAllBooks();
  }, []);

  const updateBookShelf = async (
    book: Book,
    type: ShelfType
  ): Promise<void> => {
    const updatedBook = book;
    updatedBook.shelf = type;
    if (books) {
      const allBooks = books.slice();
      const lastBookIndex = books.findIndex((b) => b.id === updatedBook.id);
      if (lastBookIndex !== -1) allBooks[lastBookIndex] = updatedBook;
      setBooks(allBooks);
    }

    await update(book, type);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage books={books} updateBookShelf={updateBookShelf} />}
      />
      <Route
        path="/search"
        element={<Search books={books} updateBookShelf={updateBookShelf} />}
      />
    </Routes>
  );
}

export default App;
