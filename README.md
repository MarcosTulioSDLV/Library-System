# Library System
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white)  ![H2 Database](https://img.shields.io/badge/H2%20Database-018bff?style=for-the-badge&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-6DB33F?style=for-the-badge&logo=swagger&logoColor=white)

I developed a Web Application to manage books and his authors in a library. This system allows to store book information such name, ISBN (only ISBN-13 format accepted), edition, and year and also author information such name, last name and email.

![LibrarySystem_Img](https://github.com/MarcosTulioSDLV/Library-System/assets/41268178/573b4109-d0fa-4b00-b213-0a2fec090ea3)

[See Video!](https://www.youtube.com/watch?v=bYUE_2XaKh4&t=10s)

# Library System Rest API (Backend)
The Backend was powered by a Rest API by using **Spring Boot and java.
I used some common libraries for this Rest API such Spring Web, Spring Data JPA, Validation, H2 Database and SpringFox Boot Starter 3.0.0 (for the API documentation with Swagger)**.

Spring validation was used to validate the book and author attributes, setting the book to accept ISBN only with ISBN-13 format, positive numbers for year, ensuring no blank attributes, and on the other hand, setting the author to accept only email on right format and ensuring no blank attributes.

## Database Config: 
For test this API, an external database is not necessary because an embedded database (H2 Database) was used with the following configuration properties:

- name: library_db
- user name: sa
- password:

## Development Tools:
This Rest API was powered with:

- Spring Boot version: 2.7.15
- Java version: 1.8

# Fronted

## Development Tools:
The Fronted was powered by using:
- HTML
- CSS
- Vanilla JavaScript.
