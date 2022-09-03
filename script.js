// ---------VARIABLES--------------------

let isRead;
let myLibrary       = [];
let cardFace        = 1;
let addBookBtn      = document.querySelector(".add-book-btn");
let overlay         = document.querySelector(".overlay");
let formContainer   = document.querySelector(".form-container");
let booksContainer  = document.querySelector(".books-container");
let warningText     = document.querySelector(".warning");
let bookTitle       = document.getElementById("title");
let bookAuthor      = document.getElementById("author");
let bookPages       = document.getElementById("pages");
let imageUrl        = document.getElementById("img-url");
let addForm         = document.querySelector(".form");
let formExitBtn     = document.querySelector(".exit-btn");

// ---------FUNCTIONS---------------------
function Book(title,author,pages,isRead,coverUrl){
    //the constractor
    this.title    = title;
    this.author   = author;
    this.pages    = pages;
    this.isRead   = isRead;
    this.coverUrl = coverUrl;
}

function removeBook(e){
    let bookIndex;
    myLibrary.forEach(book =>{
        if(book.title === e.target.value){
            bookIndex = myLibrary.indexOf(book);
        }
    })
    if (bookIndex > -1){// only splice array when item is found
        myLibrary.splice(bookIndex,1)// 2nd parameter means remove one item only
    }
    displayBooks();

}
function changeReadStatus(e){
    let bookIndex;
    myLibrary.forEach(book =>{
        if (book.title === e.target.value)
            bookIndex = myLibrary.indexOf(book)
    })

    if(e.target.textContent === 'Read'){
        myLibrary[bookIndex].isRead = 'Not Read';
        e.target.textContent        = 'Not Read';        
    }


    else if(e.target.textContent === 'Not Read'){
        myLibrary[bookIndex].isRead = 'Read';
        e.target.textContent        = 'Read';
    }
}
function displayBooks(){
    booksContainer.innerHTML = "";
    myLibrary.forEach(book =>{
        let bookCard                = document.createElement("div");
        let bookContent             = document.createElement("div");
        let title                   = document.createElement("h1");
        let bookDescription         = document.createElement('p');
        let readStatus              = document.createElement('p')
        let removeBtn               = document.createElement("button");
        bookCard.className          = 'book';
        bookCard.value              =  book.coverUrl;
        bookCard.style.cssText      = `background-image:url(${book.coverUrl}) !important;`;
        bookContent.className       = 'book-content';
        title.className             = 'book-title';
        title.textContent           =  book.title;
        bookDescription.className   = 'book-description';
        bookDescription.textContent = `author:${book.author}, ${book.pages} pages`;
        readStatus.className        = 'status-text';
        readStatus.textContent      =  book.isRead;
        readStatus.value            =  book.title;
        removeBtn.textContent       = 'Remove';
        removeBtn.value             =  book.title;
        bookContent.classList.add("flip-card");
        removeBtn.classList.add("remove-btn");
        removeBtn.classList.add("flip-card")
        removeBtn.classList.add("btns");
        readStatus.addEventListener('click',changeReadStatus);
        bookCard.addEventListener('click',flipCard);
        removeBtn.addEventListener('click',removeBook);
        bookContent.appendChild(title);
        bookContent.appendChild(bookDescription);
        bookContent.appendChild(readStatus);
        bookCard.appendChild(bookContent);
        bookCard.appendChild(removeBtn);
        booksContainer.appendChild(bookCard);

    }) 
}
function addBookToLibrary(){
    isRead = document.querySelector("input[type='radio'][name='read']:checked");
    let newBook       = new Book;
    newBook.title     = bookTitle.value;
    newBook.author    = bookAuthor.value;
    newBook.pages     = bookPages.value;
    newBook.isRead    = isRead.value;
    newBook.coverUrl  = imageUrl.value;
    //validate inputs
    if(!validate(newBook))
        return;
    myLibrary.push(newBook);
    displayBooks();
}
function validate(newBook){
    for (let key in newBook){
        if (newBook[key] == ""){
            warningText.textContent = `Enter a valid value for ${key}`;
            return false;
        }
    }
    if(myLibrary.find(object =>{ if(object.title === newBook.title) return true;})){
        warningText.textContent = "Book Already Exists."
        return false;
    }
        
    return true;        
}
function flipCard(e){
    if(cardFace === 0){
        e.target.style.cssText = `background-image:url(${e.target.value}) !important;`;
        e.target.querySelector(".book-content").classList.add("flip-card");
        e.target.querySelector(".remove-btn").classList.add("flip-card");
        cardFace = 1;
    }
    else if(cardFace === 1){
        e.target.style.cssText = `background-image:none !important;`;
        e.target.querySelector(".book-content").classList.remove("flip-card");
        e.target.querySelector(".remove-btn").classList.remove("flip-card");
        cardFace = 0;
    }
    // document.;
    // document.;
}


// ---------EVENT LISTENERS---------------
// setInterval(displayBooks,5000);
addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    addBookToLibrary();
});

addBookBtn.addEventListener('click',()=>{
    formContainer.classList.add("active");
    overlay.classList.add("active");
});
formExitBtn.addEventListener('click',()=>{
    formContainer.classList.remove("active");
    overlay.classList.remove("active");
});


