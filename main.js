class Library {
    constructor() {
        this.books = [];
    }

    addBook = function(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook = function(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook = function(title) {
        return this.books.find((book) => book.title === title);
    }

    isInLibrary = function(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }
}

class Book {
    constructor(title, author, pageCount, isRead) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.isRead = isRead;
    }
}

const library = new Library

const addBookBtn = document.getElementById("addBookBtn");
const bookGrid = document.getElementById("bookGrid");
const addBookModal = document.getElementById("addBookModal");
const addBookForm = document.getElementById("addBookForm");
const overlay = document.getElementById("overlay");
const errorMsg = document.getElementById("error");

const openBookModal = () => {
    addBookForm.reset();
    addBookModal.classList.add("active");
    overlay.classList.add("active");
}

const closeBookModal = () => {
    addBookModal.classList.remove("active");
    overlay.classList.remove("active");
    errorMsg.classList.remove("active");
}

const resetBookGrid = () => {
    bookGrid.innerHTML = "";
}

const updateBookGrid = () => {
    resetBookGrid();
    for (let book of library.books) {
        createBookCard(book);
    }
}

const createBookCard = (book) => {
    const card = document.createElement("div");
    const cardHeadGroup = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pageCount = document.createElement("p");
    const separator = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    card.classList.add("book-card");
    cardHeadGroup.classList.add("card-head-group");
    title.classList.add("card-title");
    author.classList.add("card-author");
    pageCount.classList.add("card-page-count");
    readBtn.classList.add("card-read-btn");
    separator.classList.add("card-sep");
    removeBtn.classList.add("card-remove-btn");

    readBtn.onclick = toggleRead;
    removeBtn.onclick = removeBook;

    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    pageCount.textContent = `${book.pageCount} pages`;

    removeBtn.textContent = "Remove";

    if (book.isRead) {
        readBtn.textContent = "Read";
        readBtn.classList.add("btn-valid");
    } else {
        readBtn.textContent = "Not Read";
        readBtn.classList.add("btn-invalid");
    }

    cardHeadGroup.appendChild(title);
    cardHeadGroup.appendChild(author);
    cardHeadGroup.appendChild(pageCount);
    card.appendChild(cardHeadGroup);
    card.appendChild(separator);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);

    bookGrid.appendChild(card);
}

const getBookFromInput = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("pageCount").value;
    const isRead = document.getElementById("isRead").checked;

    return new Book(title, author, pageCount, isRead);
}

const addBook = (e) => {
    e.preventDefault();
    
    const newBook = getBookFromInput();

    if (library.isInLibrary(newBook)) {
        errorMsg.classList.add("active");
        return;
    }

    library.addBook(newBook);

    saveBooks();

    updateBookGrid();
    closeBookModal();
}

const removeBook = (e) => {
    const title = e.target.parentNode.firstChild.firstChild.innerHTML;
    
    library.removeBook(title);
    saveBooks();
    updateBookGrid();
}

const toggleRead = (e) => {
    const title = e.target.parentNode.firstChild.firstChild.innerHTML;

    const book = library.getBook(title);
    book.isRead = !book.isRead;
    saveBooks();
    updateBookGrid();
}

const saveBooks = () => {
    localStorage.setItem("library", JSON.stringify(library.books));
}

const loadBooks = () => {
    const books = JSON.parse(localStorage.getItem("library"));
    if (books) {
        library.books = books.filter((book) => new Book(book.title, book.author, book.pageCount, book.isRead));
    }
    updateBookGrid();
}

addBookBtn.onclick = openBookModal;
overlay.onclick = closeBookModal;
addBookForm.onsubmit = addBook;

window.onload = loadBooks;