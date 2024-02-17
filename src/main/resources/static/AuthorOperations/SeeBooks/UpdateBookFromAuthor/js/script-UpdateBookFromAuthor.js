
const saveButton= document.querySelector('#saveButton');
const updateBookForm= document.querySelector('#updateBookForm');
const isbnText= updateBookForm.elements['isbnText'];
const nameText= updateBookForm.elements['nameText'];
const editionText= updateBookForm.elements['editionText'];
const yearText= updateBookForm.elements['yearText'];

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');

const backButton= document.querySelector('#backButton');


updateBookForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return;

    try {
        const updatedBook = await updateBook({'id':bookId,'isbn':isbnText.value,'name': nameText.value,'edition': editionText.value,'publicationYear':yearText.value});
        window.alert('The book was updated successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
        backButton.click();
    } catch (error) {
      handleErrorResponse(error);
    }
});

function handleErrorResponse(error){
  const errorMessage= error.message;
  try {
    const errorObject= JSON.parse(errorMessage);
    if(errorObject.status===409){
      window.alert(`Conflict: ${errorObject.responseText}`);
    }
    else
      console.error('Error updating the book:', error);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
    console.error('Error updating the book:', error);
  }
}


function validateFormData(){
  if(isbnText.value==='' || nameText.value==='' || editionText.value==='' || (yearText.value==='' || yearText.value<0)){
    window.alert('ISBN, Name, Edition or Year not valid');
    return false;
  }
  if(!isValidIsbn(isbnText.value)){
    window.alert('ISBN is not valid (use only ISBN-13)');
    return false;
  }
  return true;
}

function isValidIsbn(isbn){
  const isbnRegex= new RegExp(/^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/);//Only ISBN-13
  return isbnRegex.test(isbn);
}

backButton.addEventListener('click',()=> {
  window.location.href= '/AuthorOperations/SeeBooks/SeeBooks.html';
});

loadFormData(bookId);

async function updateBook(book){
    const apiUrl = `/api/books/${book.id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Método HTTP para actualización (puede ser 'PUT' u otro)
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(book), // Convierte el objeto a JSON y lo envía como cuerpo de la solicitud
      });
      if (!response.ok) {
        throw new Error(JSON.stringify({
          status: response.status,
          responseText: await response.text()
        }));
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error for handling at the caller's level
    }
}

async function loadFormData(id){
  try {
    const book = await getBook(id);
    isbnText.value= book.isbn;
    nameText.value = book.name;
    editionText.value = book.edition;
    yearText.value= book.publicationYear;
  } catch (error) {
    console.error('Error getting book data:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
  }
}

async function getBook(id){
    const apiUrl = `/api/books/${id}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error for handling at the caller's level
    }
}


