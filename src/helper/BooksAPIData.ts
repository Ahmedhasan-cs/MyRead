export interface BookImage {
    smallThumbnail: string;
    thumbnail: string;
}

export enum ShelfType {
    CurrentlyReading = "currentlyReading",
    WantToRead = "wantToRead",
    Read = "read",
}

export const Shelves = [ShelfType.CurrentlyReading, ShelfType.WantToRead ,ShelfType.Read];

export interface Book {
    allowAnonLogging: boolean;
    authors: string[];
    averageRating: number;
    categories: string[];
    description: string;
    id: string;
    imageLinks: BookImage;
    pageCount: number;
    shelf: ShelfType;
    title: string;
    subtitle: string;
}


export const getBooksByShelf = (books: Book[]): Record<ShelfType, Book[]> => {
    let booksShelfes: Record<string, Book[]> = {};
    Shelves.forEach((shelfType: ShelfType) => {
        const filteredBooks = books.filter((book: Book) => {
            return book.shelf === shelfType
        })
        booksShelfes[shelfType] = filteredBooks;
      });
    return booksShelfes;
}