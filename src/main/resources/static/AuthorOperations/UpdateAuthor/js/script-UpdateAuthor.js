
const updateAuthorForm= document.querySelector('#updateAuthorForm');
const nameText= updateAuthorForm.elements['nameText'];
const lastNameText= updateAuthorForm.elements['lastNameText'];
const emailText= updateAuthorForm.elements['emailText'];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const backButton= document.querySelector('#backButton');

updateAuthorForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return;

    try {
        const updatedAuthor = await updateAuthor({'id':id,'name': nameText.value,'lastName': lastNameText.value,'email': emailText.value});
        window.alert('The author was updated successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
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
      console.error('Error updating the author:', error);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
    console.error('Error updating the author:', error);
  }
}

function validateFormData(){
  if(nameText.value==='' || lastNameText.value==='' || emailText.value===''){
    window.alert('Name, Last Name or Email Empty');
    return false;
  }
  if(!isValidEmail(emailText.value)){
    window.alert('Email is not valid');
    og('Email is not valid');
    return false;
  }
  return true;
}

function isValidEmail(email){
  const emailRegex= new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  //regex1: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  //regex2: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email);
}

backButton.addEventListener('click',()=> {
  window.location.href= "/AuthorOperations/AuthorOperations.html";//method 2 //window.history.back();
});

loadFormData(id);

async function updateAuthor(author){
    const apiUrl = `/api/authors/${author.id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Método HTTP para actualización (puede ser 'PUT' u otro)
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(author), // Convierte el objeto y lo envía como cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error(JSON.stringify({//Lanzar un error con un objeto JSON que contiene el estado y el mensaje de respuesta
            status: response.status,
            responseText: await response.text()
        }));
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; //Rethrow the error for handling at the caller's level
    }
}

async function loadFormData(id){
  try {
    const author = await getAuthor(id);
    nameText.value = author.name;
    lastNameText.value = author.lastName;
    emailText.value= author.email;
  } catch (error) {
    console.error('Error getting author data:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
  }
}

async function getAuthor(id){
  const apiUrl = `/api/authors/${id}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // This will be an author
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error for handling at the caller's level
  }
}


