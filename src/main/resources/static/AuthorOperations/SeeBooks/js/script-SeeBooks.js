
//pagination
const PAGE_SIZE = 3; // Number of items to display per page
let currentPage = 1; // Current page

const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
//-----

const authorText= document.querySelector('#authorText');
const paginationText= document.querySelector('#paginationText');
const backButton= document.querySelector('#backButton');
const updateBookButton= document.querySelector('#updateBookButton'); 
const removeBookButton= document.querySelector('#removeBookButton');

const authorId= sessionStorage.getItem('authorId');

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
      currentPage--;  
      displayRowsForBooks(currentPage, PAGE_SIZE);
  }
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    displayRowsForBooks(currentPage, PAGE_SIZE);
});


backButton.addEventListener('click',()=>{
  window.location.href= "/AuthorOperations/AuthorOperations.html";
});


updateBookButton.addEventListener('click', () => {
    const selectedBookRadioButton= getSelectedBookRadioButton();
    if(selectedBookRadioButton==undefined)
        return;

    const selectedBookId= selectedBookRadioButton.value;

    window.location.href= `UpdateBookFromAuthor/UpdateBookFromAuthor.html?bookId=${selectedBookId}`;
});


removeBookButton.addEventListener('click',async () => {
    const selectedBookRadioButton= getSelectedBookRadioButton();
    if(selectedBookRadioButton==undefined)
        return;
    
    const selectedId= selectedBookRadioButton.value;

    if(!window.confirm('Do you want to remove this book?')){
        return;
    }

    try{
      const removedBook= await removeBook(selectedId);
      window.alert('The book was removed successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
      window.location.reload();
    }catch (error) {
      console.error('An error occurred while removing the book:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
    }
});

displayAuthorInfo();
displayRowsForBooks(currentPage, PAGE_SIZE);

function getSelectedBookRadioButton(){
    const bookRadioButton= document.querySelectorAll('.tableBooks tbody input[name="bookRadioButton"]');
    
    const selectedBookRadioButton= Array.from(bookRadioButton).find(radio=>radio.checked===true);
    if(selectedBookRadioButton==undefined){
      window.alert('No book selected, please select a Book!');
    }
    return selectedBookRadioButton;
}


async function displayAuthorInfo(){
  const author= await fetchAuthor();
  authorText.textContent= 'Author: '+author.name+' '+author.lastName;
}

async function fetchAuthor(){
  const apiURL= `/api/authors/${authorId}`;
  try{
    const response= await fetch(apiURL);
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    const data= await response.json();
    return data; // This will be a list of objects (e.g., Page<Book>)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error for handling at the caller's level
  }
}

async function displayRowsForBooks(page, pageSize) {
  const tbody = document.querySelector('.tableBooks tbody');
  const tableBooks = tbody.parentNode; 

  try {
    tableBooks.style.opacity = 0; // Configuramos la opacidad a 0 antes de la transición
    
    tbody.innerHTML = ''; // Clear existing rows in the table body

    const apiUrl = `/api/books-by-author-id/${authorId}?page=${page - 1}&size=${pageSize}`;
    let booksPage= await fetchBooks(apiUrl);

    const rawsFragment= document.createDocumentFragment();

    booksPage.content.forEach((book) => {// Iterate through the list of books and create a row for each book
      const tr= document.createElement('tr');
      tr.innerHTML= `
        <td>${book.isbn}</td>
        <td>${book.name}</td>
        <td>${book.edition}</td>
        <td>${book.publicationYear}</td>
        <td><input type="radio" name="bookRadioButton" value=${book.id}></td>
      `;
      rawsFragment.appendChild(tr);
    });
    tbody.appendChild(rawsFragment);

    const totalPages=  booksPage.totalPages<1 ? 1: booksPage.totalPages; 
    paginationText.textContent= `Showing ${currentPage} of ${totalPages} entries`;
    updatePaginationButtons(booksPage);
  
    // Usamos un temporizador para permitir que la transición CSS se aplique antes de cambiar el contenido
    setTimeout(() => {
      tableBooks.style.opacity = 1; // Establecer la opacidad de nuevo a 1 después de la transición. colocar el mismo valor del CSS  100 = 0,1s milisegungos!
    }, 100); // Ajusta el tiempo según la duración de la transición CSS (en milisegundos)
        
  } catch (error) {
    console.error('Error:', error); // Handle any errors that occurred during the fetch operation
  }
}

async function fetchBooks(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // This will be a list of objects (e.g., Page<Book>)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error for handling at the caller's level
  }
}


async function removeBook(id){
    const apiUrl = `/api/books/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE', // Especifica el método DELETE
        headers: {
          'Content-Type': 'application/json', // Puedes ajustar el encabezado según lo requiera tu API
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Vuelve a lanzar el error para manejarlo en el nivel del llamador
    }
}


function updatePaginationButtons(booksPage) {
  const totalPages = booksPage.totalPages;

  if (currentPage === 1)
    prevPageButton.disabled = true;
  else
    prevPageButton.disabled = false;

  if(currentPage>=totalPages)
    nextPageButton.disabled = true;
  else
    nextPageButton.disabled = false;
}


