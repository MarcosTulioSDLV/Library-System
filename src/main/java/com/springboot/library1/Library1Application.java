package com.springboot.library1;

import com.springboot.library1.models.Author;
import com.springboot.library1.models.Book;
import com.springboot.library1.repositories.AuthorRepository;
import com.springboot.library1.repositories.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class Library1Application implements CommandLineRunner {

	private static final Logger LOG= LoggerFactory.getLogger(Library1Application.class);

	@Autowired
	private AuthorRepository authorRepository;
	@Autowired
	private BookRepository bookRepository;


	public static void main(String[] args) {
		SpringApplication.run(Library1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		//Create instances and Add to DB by Java code.
		/*
		Author author1= new Author(null,"Gabriel","Garcia Marquez","e1@gmail.com",new ArrayList<>());
		Author author2= new Author(null,"Dante","Alighieri","e2@gmail.com",new ArrayList<>());
		Author author3= new Author(null,"Stephen","King","e3@gmail.com",new ArrayList<>());

		Book book1= new Book(null,"978-0-13-235088-4","Cien años de soledad","1",1967,author1);
		Book book2= new Book(null,"978-0-306-40615-7","Cronica de una muerte anunciada","1",1981,author1);
		Book book3= new Book(null,"978-0-672-31614-8","La divina comedia","1",1472,author2);
		Book book4= new Book(null,"978-0-13-609181-6","El resplandor","2",1977,author3);

		author1.getBooks().add(book1);
		author2.getBooks().addAll(Arrays.asList(book2,book3));
		author3.getBooks().add(book4);

		//Add to DB by Java code, execute only first time.
		authorRepository.saveAll(Arrays.asList(author1,author2,author3));
		bookRepository.saveAll(Arrays.asList(book1,book2,book3,book4));
		 */
	}

}
