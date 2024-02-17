package com.springboot.library1.services;

import com.springboot.library1.models.Author;
import com.springboot.library1.models.Book;
import com.springboot.library1.repositories.AuthorRepository;
import com.springboot.library1.repositories.BookRepository;
import net.bytebuddy.implementation.bytecode.Throw;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    private static final Logger LOG= LoggerFactory.getLogger(BookService.class);

    public Page<Book> getBooks(Pageable pageable) {
        Page<Book> booksPage= bookRepository.findAll(pageable);
        return booksPage;
    }

    public Book getBookById(Long id) {
        Book book= bookRepository.findById(id).orElseThrow(()-> new BookNotFoundException("Book with id "+id+" not found"));
        return book;
    }

    public Page<Book> getBooksByName(String name,Pageable pageable) {
        Page<Book> booksPage= bookRepository.findByNameContainingIgnoreCase(name,pageable);
        return booksPage;
    }

    public Page<Book> getBooksByAuthorId(Long authorId,Pageable pageable) {
        Author author= authorRepository.findById(authorId).orElseThrow(()->new AuthorNotFoundException("Author with id "+authorId+" not found"));

        Page<Book> booksPage= bookRepository.findByAuthor(author,pageable);
        return booksPage;
    }

    @Transactional
    public Book addBook(Long authorId,Book book) {
        if(bookRepository.existsByIsbn(book.getIsbn())){
            throw new IsbnExistsException("ISBN "+book.getIsbn()+" already exists");
        }
        Author author= authorRepository.findById(authorId).orElseThrow(()->new AuthorNotFoundException("Author with id "+authorId+" not found"));

        book.setAuthor(author);
        bookRepository.save(book);
        LOG.info("---After save---");
        return book;
    }

    @Transactional
    public Book updateBook(Book book) {
        Book recoveredBook= bookRepository.findById(book.getId())
                .orElseThrow(()->new BookNotFoundException("Book with id "+book.getId()+" not found"));

        if(isbnBelongsToAnotherExistingInstance(book.getIsbn(),recoveredBook.getIsbn())){
            throw new IsbnExistsException("ISBN "+book.getIsbn()+" already exists");
        }

        BeanUtils.copyProperties(book,recoveredBook,"author");
        LOG.info("---After update book---");
        return recoveredBook;
    }

    private boolean isbnBelongsToAnotherExistingInstance(String isbn1,String isbn2) {
        return bookRepository.existsByIsbn(isbn1) && !isbn1.equals(isbn2);
    }


    @Transactional
    public Book removeBook(Long id) {
        Book book= bookRepository.findById(id).orElseThrow(()-> new BookNotFoundException("Book with id "+id+" not found"));

        bookRepository.delete(book);
        LOG.info("---After Remove---");
        return book;
    }



}
