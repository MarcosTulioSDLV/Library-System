


const bookButton= document.getElementById('bookButton');
const authorButton= document.getElementById('authorButton');

authorButton.addEventListener('click',()=>{
  window.location.href= "/AuthorOperations/AuthorOperations.html";
});

bookButton.addEventListener('click',()=>{
    window.location.href = "/BookOperations/BookOperations.html";
});

