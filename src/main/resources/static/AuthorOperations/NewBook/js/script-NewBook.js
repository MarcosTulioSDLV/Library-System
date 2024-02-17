
const newBookForm= document.querySelector('#newBookForm');
const isbnText= newBookForm.elements['isbnText'];
const nameText= newBookForm.elements['nameText'];
const editionText= newBookForm.elements['editionText'];
const yearText= newBookForm.elements['yearText'];

const backButton= document.querySelector('#backButton');

const urlParams= new URLSearchParams(window.location.search);
const authorId= urlParams.get('authorId');

newBookForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return false;

    try {
        const addedBook = await addBook({'isbn':isbnText.value,'name': nameText.value,'edition': editionText.value,'publicationYear':yearText.value});
        window.alert('The book was added successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
        backButton.click();
      } catch (error) {
        handleErrorResponse(error);
    }
});

function handleErrorResponse(error){
  const errorMessage= error.message;
  try {
    const errorObject= JSON.parse(errorMessage);
    if (errorObject.status === 409) {
      window.alert(`Conflict: ${errorObject.responseText}`);
    }
    else
      console.error('Error adding the book:', error);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
    console.error('Error adding the book:', error);
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
  window.location.href= "/AuthorOperations/AuthorOperations.html";//method 2 //window.history.back();
});


async function addBook(book){
    const apiUrl = `/api/books/${authorId}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // metodo 'POST' para crear un nuevo Book
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(book), // Convierte el objeto y lo envía como cuerpo de la solicitud
      });
      if (!response.ok) {
        throw new Error(JSON.stringify({
          status:response.status,
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


