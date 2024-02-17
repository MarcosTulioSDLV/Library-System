# Library System
I developed a Web Application to manage books and his authors in a library. This system allows to store book information such name, ISBN (only ISBN-13 format accepted), edition, and year and also author information such name, last name and email.

![LibrarySystem_Img](https://www.dropbox.com/s/0dr49e2nd0cob8r/unity3D.png?dl=0?raw=1)

# Library System Rest API (Backend)
The Backend was powered by a Rest API by using springboot and java.
I used some common libraries for this Rest API such Spring Web, Spring Data JPA, Validation, H2 Database and SpringFox Boot Starter 3.0.0 (for the API documentation).

Spring validation was used to validate the book and author attributes, setting the book to accept ISBN only with ISBN-13 format, positive numbers for year, ensuring no blank attributes, and on the other hand, setting the author to accept only email on right format and ensuring no blank attributes.

This Rest API was powered with:
- Springboot version: 2.7.15
- Java version: 1.8

Database Config: For test this API, an external database is not necessary because an embedded database (H2 Database) was used with the following configuration properties:
- name: library_db
- user name: sa
- password:

The Fronted was powered by using:
- HTML
- CSS
- Vanilla JavaScript.
