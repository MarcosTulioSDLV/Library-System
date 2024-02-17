
//pagination
const PAGE_SIZE = 3; // Number of items to display per page
let currentPage = 1; // Current page

let isFilteringRows= false;

const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
//-----

const searchButton= document.querySelector('#searchButton');
const searchText= document.querySelector('#searchText');

const showAllAuthorsButton= document.querySelector('#showAllAuthorsButton');

const paginationText= document.querySelector('#paginationText');
const backButton= document.querySelector('#backButton');
const newAuthorButton= document.querySelector('#newAuthorButton');

const updateAuthorButton= document.querySelector('#updateAuthorButton'); 
const removeAuthorButton= document.querySelector('#removeAuthorButton');
const seeBooksButton= document.querySelector('#seeBooksButton');
const newBookButton= document.querySelector('#newBookButton');

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
      currentPage--;  
    if(isFilteringRows)
      displayRowsFilteringByName(searchText.value);
    else 
      displayRows();
  }

});

nextPageButton.addEventListener('click', () => {
  currentPage++;
  if(isFilteringRows)
    displayRowsFilteringByName(searchText.value);
  else
    displayRows();
});

searchButton.addEventListener('click', () => {
  currentPage=1;//actualizar pagina cada vez que se va a hacer una nueva busqueda
  isFilteringRows= true;
  displayRowsFilteringByName(searchText.value);
});

showAllAuthorsButton.addEventListener('click', () => {
    currentPage= 1;
    isFilteringRows= false;
    displayRows();
});

newAuthorButton.addEventListener('click',()=>{
    window.location.href= "NewAuthor/NewAuthor.html"; 
});

updateAuthorButton.addEventListener('click', () => {
    const selectedAuthorRadioButton= getSelectedAuthorRadioButton();
    if(selectedAuthorRadioButton==undefined)
        return;

    const selectedId= selectedAuthorRadioButton.value;

    window.location.href= `UpdateAuthor/UpdateAuthor.html?id=${selectedId}`;    //window.location.replace("UpdateBookP2/UpdateBookP2.html?id="+selectedId);
});


removeAuthorButton.addEventListener('click',async () => {
    const selectedAuthorRadioButton= getSelectedAuthorRadioButton();
    if(selectedAuthorRadioButton==undefined)
        return;
    
    const selectedAuthorId= selectedAuthorRadioButton.value;

    if(!window.confirm('Do you want to remove this author?')){
        return;
    }

    try{
      const removedAuthor= await removeAuthor(selectedAuthorId);
      window.alert('The author was removed successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.

      window.location.reload();
    }catch (error) {
      console.error('An error occurred while removing the author:', error);
    }
});

backButton.addEventListener('click',()=>{
  window.location.href= "http://localhost:8080/";//window.history.back();
});

seeBooksButton.addEventListener('click',()=>{
    const selectedAuthorRadioButton= getSelectedAuthorRadioButton();
    if(selectedAuthorRadioButton==undefined)
      return;
    const selectedAuthorId= selectedAuthorRadioButton.value;

    //method 1 (by using sessionstorage) 
    sessionStorage.setItem('authorId',selectedAuthorId);
    window.location.href= 'SeeBooks/SeeBooks.html';//method 2 (by using URL params) //window.location.href= `SeeBooks/SeeBooks.html?authorId=${selectedAuthorId}`;
});

newBookButton.addEventListener('click', ()=>{
    const selectedAuthorRadioButton= getSelectedAuthorRadioButton();
    if(selectedAuthorRadioButton==undefined)
        return;
    const selectedAuthorId= selectedAuthorRadioButton.value;

    window.location.href= `NewBook/NewBook.html?authorId=${selectedAuthorId}`;
});


displayRows();


function getSelectedAuthorRadioButton(){
    const authorRadioButton= document.querySelectorAll('.tableAuthors tbody input[name="authorRadioButton"]');
   
    const selectedAuthorRadioButton= Array.from(authorRadioButton).find(radio=>radio.checked===true);
    if(selectedAuthorRadioButton==undefined){
      window.alert('No author selected, please select an author!');
    }
    return selectedAuthorRadioButton;
}

async function displayRows() {
  await displayRowsForAuthors(currentPage, PAGE_SIZE);
}

async function displayRowsFilteringByName(name) {
  await displayRowsForAuthors(currentPage, PAGE_SIZE, name);
}

async function displayRowsForAuthors(page, pageSize, name = '') {
  const tbody = document.querySelector('.tableAuthors tbody');
  const tableAuthors= tbody.parentNode;

  try {
    tableAuthors.style.opacity = 0; // Configuramos la opacidad a 0 antes de la transición

    tbody.innerHTML = '';//Clear existing rows in the table body

    let authorsPage;
    if(name)
        authorsPage= await getAuthorsByName(name, page, pageSize);
    else
      authorsPage= await getAuthors(page, pageSize);

    const rawsFragment= document.createDocumentFragment();

    authorsPage.content.forEach((author) => {// Iterate through the list and create a row for each one
      const tr= document.createElement('tr');
      tr.innerHTML= `
        <td>${author.name}</td>
        <td>${author.lastName}</td>
        <td>${author.email}</td>
        <td><input type="radio" name="authorRadioButton" value=${author.id}></td>
        `;
      rawsFragment.appendChild(tr);
    });
    tbody.appendChild(rawsFragment);
    
    const totalPages= authorsPage.totalPages<1?1:authorsPage.totalPages;  
    paginationText.textContent= `Showing ${currentPage} of ${totalPages} entries`;
    
    updatePaginationButtons(authorsPage);

    // Usamos un temporizador para permitir que la transición CSS se aplique antes de cambiar el contenido
    setTimeout(() => {
      tableAuthors.style.opacity = 1; // Establecer la opacidad de nuevo a 1 después de la transición. // Establecer la opacidad de nuevo a 1 después de la transición. colocar el mismo valor del CSS  100 = 0,1s milisegungos!
    }, 100); // Ajusta el tiempo según la duración de la transición CSS (en milisegundos)
    
  } catch (error) {
    console.error('Error:', error); // Handle any errors that occurred during the fetch operation
  }
}


async function removeAuthor(id){
    const apiUrl = `/api/authors/${id}`;
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


async function getAuthors(page, PAGE_SIZE) {
  const apiUrl = `/api/authors?page=${page - 1}&size=${PAGE_SIZE}`;
  return fetchAuthors(apiUrl);
}


async function getAuthorsByName(name, page, PAGE_SIZE) {
  const apiUrl = `/api/authors-by-name/${name}?page=${page - 1}&size=${PAGE_SIZE}`;
  return fetchAuthors(apiUrl);
}

async function fetchAuthors(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data; // This will be a list of objects (e.g., Page<Author>)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error for handling at the caller's level
  }
}

function updatePaginationButtons(authorsPage) {
  const totalPages = authorsPage.totalPages;

  if (currentPage === 1)
    prevPageButton.disabled = true;
  else
    prevPageButton.disabled = false;

  if(currentPage>=totalPages)
    nextPageButton.disabled = true;
  else
    nextPageButton.disabled = false;
}


