
const newAuthorForm= document.querySelector('#newAuthorForm');
const nameText= newAuthorForm.elements['nameText'];
const lastNameText= newAuthorForm.elements['lastNameText'];
const emailText= newAuthorForm.elements['emailText'];

const backButton= document.querySelector('#backButton');

newAuthorForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return;

    try {
      const addedAuthor = await addAuthor({'name': nameText.value,'lastName': lastNameText.value,'email': emailText.value});
      window.alert('The author was added successfully.');//Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
      backButton.click();
    } catch(error) {
      handleErrorResponse(error);
    }  
});

function handleErrorResponse(error){
  const errorMessage= error.message;
  try { //Verificar si el error es una cadena JSON y tratar de analizarlo
      const errorObject= JSON.parse(errorMessage);
      if (errorObject.status === 409) {
        window.alert(`Conflict: ${errorObject.responseText}`);
      }
      else
        console.error('Error adding the author:', error);
  } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      console.error('Error adding the author:', error);
  }
}

function validateFormData(){
  if(nameText.value==='' || lastNameText.value==='' || emailText.value===''){
    window.alert('Name, Last Name or Email Empty');
    return false;
  }
  if(!isValidEmail(emailText.value)){
    window.alert('Email is not valid');
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


async function addAuthor(author){
    const apiUrl = '/api/authors';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // metodo 'POST' para crear un nuevo autor
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(author), // Convierte el objeto y lo envía como cuerpo de la solicitud
      });
      
      if (!response.ok) {
        throw new Error(JSON.stringify({//Lanzar un error con un objeto JSON que contiene el estado y el mensaje de respuesta
            status:response.status,
            responseText:await response.text()
        }));
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error for handling at the caller's level
    }
}


