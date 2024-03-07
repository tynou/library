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
    constructor(title, about, author, pageCount, isRead) {
        this.title = title;
        this.about = about;
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

const openBookModal = () => {
    addBookForm.reset();
    addBookModal.classList.add("active")
    overlay.classList.add("active")
}

const closeBookModal = () => {
    addBookModal.classList.remove("active")
    overlay.classList.remove("active")
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
    console.log(book);
    const card = document.createElement("div");
    const cardHeadGroup = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pageCount = document.createElement("p");
    const separator1 = document.createElement("div");
    const about = document.createElement("p");
    const separator2 = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    card.classList.add("book-card");
    cardHeadGroup.classList.add("card-head-group");
    title.classList.add("card-title");
    author.classList.add("card-author");
    pageCount.classList.add("card-page-count");
    readBtn.classList.add("card-read-btn");
    separator1.classList.add("card-sep");
    separator2.classList.add("card-sep");
    about.classList.add("card-about");
    removeBtn.classList.add("card-remove-btn");

    readBtn.onclick = toggleRead;
    removeBtn.onclick = removeBook;

    title.textContent = book.title;
    about.textContent = book.about ? book.about : "No Description";
    author.textContent = book.author;
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
    cardHeadGroup.appendChild(readBtn);
    card.appendChild(cardHeadGroup);
    card.appendChild(separator1);
    card.appendChild(about);
    card.appendChild(separator2);
    card.appendChild(removeBtn);

    bookGrid.appendChild(card);
}

const getBookFromInput = () => {
    const title = document.getElementById("title").value;
    const about = document.getElementById("about").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("pageCount").value;
    const isRead = document.getElementById("isRead").checked;

    console.log(title, about, author, pageCount, isRead);

    return new Book(title, about, author, pageCount, isRead);
}

const addBook = (e) => {
    e.preventDefault();
    
    const newBook = getBookFromInput();

    if (library.isInLibrary(newBook)) {
        return;
    }

    library.addBook(newBook);

    updateBookGrid();
    closeBookModal();
}

const removeBook = (e) => {
    const title = e.target.parentNode.firstChild.firstChild.innerHTML;
    
    library.removeBook(title);
    updateBookGrid();
}

const toggleRead = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML;

    const book = library.getBook(title);
    book.isRead = !book.isRead;
    updateBookGrid();
}

addBookBtn.onclick = openBookModal;
overlay.onclick = closeBookModal;
addBookForm.onsubmit = addBook;

